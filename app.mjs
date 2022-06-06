import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { Transaction } from "sequelize";

const { database, Wycieczka, Zgloszenie } = await import('./database.mjs');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({
    extended: true
  }))


async function getOffers() {
    const db_data = await Wycieczka.findAll({
        order: [
            ['data_poczatku', 'ASC']
        ]
    });
    let offers = [];
    db_data.forEach(record => {
        //if (new Date(record.dataValues.data_poczatku) > Date.now())
            offers.push(record.dataValues)}
    );
    
    return offers;
}

async function addBooking(info, trip_id) {
    try {
        await database.transaction(
            { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
            async (t) => {
                const trip = await Wycieczka.findByPk(trip_id);
                
                if (trip == null || trip.dataValues.dostepne_miejsca < info.how_many) {
                    throw new Error();
                }

                trip.setDataValue('dostepne_miejsca', trip.dataValues.dostepne_miejsca - info.how_many);
                await trip.save();
                

                await Zgloszenie.create({
                    imie: info.first_name,
                    nazwisko: info.last_name,
                    email: info.email,
                    liczba_miejsc: info.how_many,
                    WycieczkaId: trip_id
                });
            }
        );
    }

    catch (err) {
        return false;
    }

    return true;
}

async function getTrip(id) {
    const trip = await Wycieczka.findByPk(id);
    if (trip === null)
        throw 'Incorrect trip id'
    
    return trip.dataValues;
}

let BOOKING_ERROR_MSG = [];
let BOOKING_SUCCESS_MSG = '';

// PUB templates //

app.get('/', async (req, res) => {
    const offers = await getOffers();
    const no_offers_text = offers.length == 0 ? "No offers" : "";
    res.status(200).render('index', {'offers': offers, 'no_offers_text': no_offers_text});
});

app.get('/trip-description/:id', async (req, res) => {
    try {
        res.status(200).render('trip_description', {'offer': await getTrip(req.params.id), 'booking_success_msg': BOOKING_SUCCESS_MSG});
    } catch (err) {
        res.status(400).send(err);
    }

    BOOKING_SUCCESS_MSG = '';
});

app.post(
    '/booking/:id',
    body('first_name').not().isEmpty().withMessage('First name must not be empty').bail().isLength({min: 1, max: 20}).withMessage('First name must be shorter than 20 characters'),
    body('last_name').not().isEmpty().withMessage('Last name must not be empty').bail().isLength({min: 1, max: 20}).withMessage('Last name must be shorter than 20 characters'),
    body('email').not().isEmpty().withMessage('Email name must not be empty').bail().isEmail().withMessage('Incorrect email format'),
    body('how_many').isInt({min: 1}).withMessage('Number of booked seats must be a positive number'),
    async (req, res, next) => {

    const errors = validationResult(req);
    BOOKING_ERROR_MSG = [];
    BOOKING_SUCCESS_MSG = 'Booked successfully';

    if (!errors.isEmpty()) {
        BOOKING_ERROR_MSG = errors.array();
        BOOKING_SUCCESS_MSG = '';
        res.redirect(302, `/booking/${req.params.id}`);
        return;
    }

    let success = await addBooking(req.body, req.params.id);

    if (!success) {
        BOOKING_ERROR_MSG = [{msg: 'You are trying to book more seats than are available'}];
        BOOKING_SUCCESS_MSG = '';
        res.redirect(302, `/booking/${req.params.id}`);
    }

    else {
        res.redirect(302, `/trip-description/${req.params.id}`);
    }
});

app.get('/booking/:id', async (req, res) => {
    try {
        res.status(200).render('booking', {'offer': await getTrip(req.params.id), 'booking_error_msg': BOOKING_ERROR_MSG});
    } catch (err) {
        res.status(400).send(err);
    }
    BOOKING_ERROR_MSG = [];
});

app.get('/booking', (req, res, next) => {
    res.status(400).send('Incorrect booking URL');
});

app.post('/booking', (req, res, next) => {
    res.status(400).send('Incorrect booking URL');
});

// Static files
app.use(express.static('public'));

// 404 NOT FOUND
app.use((req, res, next) => {
    res.status(404).send("<h1>404 Page not found</h1>");
});

app.listen(8080);