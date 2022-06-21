import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { Transaction } from "sequelize";
import bcrypt from 'bcrypt';
import sessions from 'express-session';

const { database, Wycieczka, Zgloszenie, User } = await import('./database.mjs');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({
    extended: true
}))

app.use(sessions({
    secret: "secret",
    saveUninitialized:true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false 
}));

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

async function addUser(info) {
    let hashed = await bcrypt.hash(info.password, 10);

    await User.create({
        name: info.first_name,
        last_name: info.last_name,
        email: info.email,
        password: hashed
    });
}

async function signIn(info) {
    const user = await User.findOne({
        where: {
          email: info.email
        }
      });

    if (user === null)
        return null;
    
    if (await bcrypt.compare(info.password, user.getDataValue('password')))
      return user;
    
    return null;
}

async function getTrip(id) {
    const trip = await Wycieczka.findByPk(id);
    if (trip === null)
        throw 'Incorrect trip id'
    
    return trip.dataValues;
}

async function getUserResevations(user) {
    let reservations = await Zgloszenie.findAll({
        where: {
          email: user.email
        }
      });

    if (reservations == null)
      return [];

    let result = [];

    for (let i = 0; i < reservations.length; i++) {
        let reservation = reservations[i];
        let trip = await getTrip(reservation.dataValues.WycieczkaId);
        result.push({trip: trip, reservation: reservation.dataValues});
    }

    return result;
}

function getButtonTxt(req) {
    if (req.session.logged_in !== undefined && req.session.logged_in === true)
        return "My account";

    return "Sign in"
}

let ERROR_MSG = [];
let SUCCESS_MSG = '';

app.get('/', async (req, res) => {
    const offers = await getOffers();
    const no_offers_text = offers.length == 0 ? "No offers" : "";
    res.status(200).render('index', {'offers': offers, 'no_offers_text': no_offers_text, 'button_txt': getButtonTxt(req)});
});

app.get('/trip-description/:id', async (req, res) => {
    try {
        res.status(200).render('trip_description', {'offer': await getTrip(req.params.id), 'success_msg': SUCCESS_MSG, 'button_txt': getButtonTxt(req)});
    } catch (err) {
        res.status(400).send(err);
    }

    SUCCESS_MSG = '';
});

app.post(
    '/booking/:id',
    body('first_name').not().isEmpty().withMessage('First name must not be empty').bail().isLength({min: 1, max: 20}).withMessage('First name must be shorter than 20 characters'),
    body('last_name').not().isEmpty().withMessage('Last name must not be empty').bail().isLength({min: 1, max: 20}).withMessage('Last name must be shorter than 20 characters'),
    body('email').not().isEmpty().withMessage('Email name must not be empty').bail().isEmail().withMessage('Incorrect email format'),
    body('how_many').isInt({min: 1}).withMessage('Number of booked seats must be a positive number'),
    async (req, res, next) => {

    const errors = validationResult(req);
    ERROR_MSG = [];
    SUCCESS_MSG = 'Booked successfully';

    if (!errors.isEmpty()) {
        ERROR_MSG = errors.array();
        SUCCESS_MSG = '';
        res.redirect(302, `/booking/${req.params.id}`);
        return;
    }

    let success = await addBooking(req.body, req.params.id);

    if (!success) {
        ERROR_MSG = [{msg: 'You are trying to book more seats than are available'}];
        SUCCESS_MSG = '';
        res.redirect(302, `/booking/${req.params.id}`);
    }

    else {
        res.redirect(302, `/trip-description/${req.params.id}`);
    }
});

app.get('/booking/:id', async (req, res) => {
    try {
        res.status(200).render('booking', {'offer': await getTrip(req.params.id), 'error_msg': ERROR_MSG, 'button_txt': getButtonTxt(req)});
    } catch (err) {
        res.status(400).send(err);
    }
    ERROR_MSG = [];
});

app.get('/booking', (req, res, next) => {
    res.status(400).send('Incorrect booking URL');
});

app.post(
    '/signup',
    body('first_name').not().isEmpty().withMessage('First name must not be empty').bail().isLength({min: 1, max: 20}).withMessage('First name must be shorter than 20 characters'),
    body('last_name').not().isEmpty().withMessage('Last name must not be empty').bail().isLength({min: 1, max: 20}).withMessage('Last name must be shorter than 20 characters'),
    body('email').not().isEmpty().withMessage('Email name must not be empty').bail().isEmail().withMessage('Incorrect email format'),
    body('password').not().isEmpty().withMessage('Password must not be empty'),
    body('password_again').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
    async (req, res, next) => {

    const errors = validationResult(req);
    ERROR_MSG = [];
    SUCCESS_MSG = 'Successfully signed up!';

    if (!errors.isEmpty()) {
        ERROR_MSG = errors.array();
        SUCCESS_MSG = '';
        res.redirect(302, `/signup`);
        return;
    }

    await addUser(req.body);
    res.redirect(302, `/signup`);
});

app.post(
    '/signin',
    body('email').not().isEmpty().withMessage('Email name must not be empty').bail().isEmail().withMessage('Incorrect email format'),
    body('password').not().isEmpty().withMessage('Password must not be empty'),
    async (req, res, next) => {

    const errors = validationResult(req);
    ERROR_MSG = [];
    SUCCESS_MSG = '';

    if (!errors.isEmpty()) {
        ERROR_MSG = errors.array();
        SUCCESS_MSG = '';
        res.redirect(302, `/signin`);
        return;
    }

    let success = await signIn(req.body);

    if (success != null) {
        req.session.logged_in = true;
        req.session.user = success.dataValues;
        res.redirect(302, `/myaccount`);
    }
    else {
        ERROR_MSG = [{msg: 'Incorrect email or password'}];
        res.redirect(302, `/signin`);
    }
});

app.get('/signin/', async (req, res) => {
    if (req.session.logged_in !== undefined && req.session.logged_in === true)
        res.redirect(302, `/myaccount`);
    
    else {
        res.status(200).render('signin', {'success_msg': SUCCESS_MSG, 'error_msg': ERROR_MSG, 'button_txt': getButtonTxt(req)});
        SUCCESS_MSG = '';
        ERROR_MSG = [];
    }
});

app.get('/signup/', async (req, res) => {
    if (req.session.logged_in !== undefined && req.session.logged_in === true)
        res.redirect(302, `/myaccount`);

    else {
        res.status(200).render('signup', {'success_msg': SUCCESS_MSG, 'error_msg': ERROR_MSG, 'button_txt': getButtonTxt(req)});
        SUCCESS_MSG = '';
        ERROR_MSG = [];
    }
});

app.get('/myaccount/', async (req, res) => {
    if (req.session.logged_in === undefined || req.session.logged_in === false) {
        res.redirect(302, '/');
    }

    else {
        let reservations = await getUserResevations(req.session.user);
        let no_reservations_text = "My reservations";

        if (reservations == null || reservations.length == 0)
            no_reservations_text = "No reservations";

        res.status(200).render('myaccount', {'user': req.session.user, reservations: reservations, no_reservations_text: no_reservations_text, 'button_txt': getButtonTxt(req)});
    }
});

app.get('/signout/', async (req, res) => {
    req.session.destroy();
    res.redirect(302, `/`);
});

// Static files
app.use(express.static('public'));

// 404 NOT FOUND
app.use((req, res, next) => {
    res.status(404).send("<h1>404 Page not found</h1>");
});

app.listen(8080);