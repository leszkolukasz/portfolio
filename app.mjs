import express from 'express'
import { query } from 'express';
const { database, Wycieczka, Zgloszenie } = await import('./database.mjs');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

async function getOffers() {
    const db_data = await Wycieczka.findAll({
        order: [
            ['data_poczatku', 'ASC']
        ]
    });
    let offers = [];
    db_data.forEach(record => offers.push(record.dataValues));
    
    return offers;
}

async function getTrip(id) {
    const trip = await Wycieczka.findByPk(id);
    if (trip === null)
        throw 'Incorrect trip id'
    
    return trip.dataValues;
}

/*let offers = [
    {
        'name': 'Górska wycieczka',
        'price': 1000,
        'short_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue faucibus lobortis. Suspendisse id vestibulum turpis. Vivamus fringilla nibh bibendum ipsum gravida pulvinar.',
        'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut nisi porta, molestie nisi quis, consectetur mauris. Donec euismod metus non arcu pharetra, sed accumsan lectus maximus. Vestibulum imperdiet orci at condimentum fermentum. Pellentesque mollis tellus mauris, non sagittis lacus maximus a. Proin quis suscipit sapien, id feugiat ex. Aenean eu neque molestie, scelerisque libero rhoncus, tincidunt quam. Sed non bibendum dui, sed dapibus libero. Proin eu feugiat enim. Morbi vel eros lobortis, suscipit tortor nec, rhoncus augue. Etiam ipsum ligula, gravida vitae enim dapibus, ornare tristique metus. Duis fringilla odio at felis accumsan, non luctus ipsum posuere. Aliquam at facilisis elit. Duis malesuada dolor nec aliquet posuere. Nullam erat ante, accumsan sed nulla sed, interdum porttitor tellus. Nunc rutrum massa non scelerisque interdum. Quisque turpis velit, scelerisque eu fermentum ut, lobortis eget nulla. Aenean condimentum magna eu magna commodo maximus. Nam facilisis tortor et ex lacinia, ac blandit neque finibus. Nam dictum malesuada sem, at efficitur tortor porttitor at. Quisque porta purus felis, dictum euismod orci posuere et. Quisque ex nunc, tincidunt id facilisis in, cursus vulputate nibh. Pellentesque efficitur sem sit amet scelerisque eleifend. Ut elementum, tortor sit amet vestibulum semper, nulla purus lobortis massa, nec blandit ex tellus ac justo. Ut porttitor ligula in diam venenatis faucibus. ',
        'information': ['fajna wycieczka', 'fajny opis', 'coś tam'],
        'general_plan': ['zwiedzanie 1', 'zwiedzanie 2', 'zwiedzanie 3'],
        'detailed_plan': [
            ['dzien 1 zwidzanie 1', 'dzien 1 zwiedzanie 2'],
            ['dzien 2 zwidzanie 1', 'dzien 2 zwiedzanie 2'],
        ]
    },
    {
        'name': 'Górska wycieczka 2',
        'price': 12310,
        'short_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue faucibus lobortis. Suspendisse id vestibulum turpis. Vivamus fringilla nibh bibendum ipsum gravida pulvinar.',
        'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut nisi porta, molestie nisi quis, consectetur mauris. Donec euismod metus non arcu pharetra, sed accumsan lectus maximus. Vestibulum imperdiet orci at condimentum fermentum. Pellentesque mollis tellus mauris, non sagittis lacus maximus a. Proin quis suscipit sapien, id feugiat ex. Aenean eu neque molestie, scelerisque libero rhoncus, tincidunt quam. Sed non bibendum dui, sed dapibus libero. Proin eu feugiat enim. Morbi vel eros lobortis, suscipit tortor nec, rhoncus augue. Etiam ipsum ligula, gravida vitae enim dapibus, ornare tristique metus. Duis fringilla odio at felis accumsan, non luctus ipsum posuere. Aliquam at facilisis elit. Duis malesuada dolor nec aliquet posuere. Nullam erat ante, accumsan sed nulla sed, interdum porttitor tellus. Nunc rutrum massa non scelerisque interdum. Quisque turpis velit, scelerisque eu fermentum ut, lobortis eget nulla. Aenean condimentum magna eu magna commodo maximus. Nam facilisis tortor et ex lacinia, ac blandit neque finibus. Nam dictum malesuada sem, at efficitur tortor porttitor at. Quisque porta purus felis, dictum euismod orci posuere et. Quisque ex nunc, tincidunt id facilisis in, cursus vulputate nibh. Pellentesque efficitur sem sit amet scelerisque eleifend. Ut elementum, tortor sit amet vestibulum semper, nulla purus lobortis massa, nec blandit ex tellus ac justo. Ut porttitor ligula in diam venenatis faucibus. ',
        'information': ['fajna wycieczka', 'fajny opis', 'coś tam'],
        'general_plan': ['zwiedzanie 1', 'zwiedzanie 2', 'zwiedzanie 3'],
        'detailed_plan': [
            ['dzien 1 zwidzanie 1', 'dzien 1 zwiedzanie 2'],
            ['dzien 2 zwidzanie 1', 'dzien 2 zwiedzanie 2'],
        ]
    },
    {
        'name': 'Górska wycieczka 3',
        'price': 8439,
        'short_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue faucibus lobortis. Suspendisse id vestibulum turpis. Vivamus fringilla nibh bibendum ipsum gravida pulvinar.',
        'long_description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut nisi porta, molestie nisi quis, consectetur mauris. Donec euismod metus non arcu pharetra, sed accumsan lectus maximus. Vestibulum imperdiet orci at condimentum fermentum. Pellentesque mollis tellus mauris, non sagittis lacus maximus a. Proin quis suscipit sapien, id feugiat ex. Aenean eu neque molestie, scelerisque libero rhoncus, tincidunt quam. Sed non bibendum dui, sed dapibus libero. Proin eu feugiat enim. Morbi vel eros lobortis, suscipit tortor nec, rhoncus augue. Etiam ipsum ligula, gravida vitae enim dapibus, ornare tristique metus. Duis fringilla odio at felis accumsan, non luctus ipsum posuere. Aliquam at facilisis elit. Duis malesuada dolor nec aliquet posuere. Nullam erat ante, accumsan sed nulla sed, interdum porttitor tellus. Nunc rutrum massa non scelerisque interdum. Quisque turpis velit, scelerisque eu fermentum ut, lobortis eget nulla. Aenean condimentum magna eu magna commodo maximus. Nam facilisis tortor et ex lacinia, ac blandit neque finibus. Nam dictum malesuada sem, at efficitur tortor porttitor at. Quisque porta purus felis, dictum euismod orci posuere et. Quisque ex nunc, tincidunt id facilisis in, cursus vulputate nibh. Pellentesque efficitur sem sit amet scelerisque eleifend. Ut elementum, tortor sit amet vestibulum semper, nulla purus lobortis massa, nec blandit ex tellus ac justo. Ut porttitor ligula in diam venenatis faucibus. ',
        'information': ['fajna wycieczka', 'fajny opis', 'coś tam'],
        'general_plan': ['zwiedzanie 1', 'zwiedzanie 2', 'zwiedzanie 3'],
        'detailed_plan': [
            ['dzien 1 zwidzanie 1', 'dzien 1 zwiedzanie 2'],
            ['dzien 2 zwidzanie 1', 'dzien 2 zwiedzanie 2'],
        ]
    },
];

// Log date
app.use((req, res, next) => {
    let d = new Date();
    console.log('Zadanie nastąpiło w dniu ' + ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear());
    
    if (d.getDate() == 18)
        res.locals.maintenance_text = 'Maintenance works';
    else
        res.locals.maintenance_text = 'No maintenance';
    
    next();
}); */

// PUB templates //

app.get('/', async (req, res) => {
    const offers = await getOffers();
    const no_offers_text = offers.length == 0 ? "No offers" : "";
    res.status(200).render('index', {'offers': offers, 'no_offers_text': no_offers_text});
});

/*app.get('/trip-description', (req, res, next) => {
    if (Object.keys(req.query).length > 0 && req.query.id === undefined)
        res.status(400).send('Trip ID required');
    else if (req.query.id !== undefined)
        res.status(200).render('trip_description', {'offer': offers[req.query.id-1], 'week': req.query.week});
    else
        next();
});*/

app.get('/trip-description/:id', async (req, res) => {
    try {
        res.status(200).render('trip_description', {'offer': await getTrip(req.params.id)});
    } catch (err) {
        res.status(400).send(err);
    }
});

/*app.get('/trip-description/:id/week/:week', (req, res) => {
    res.status(200).render('trip_description', {'offer': offers[req.params.id-1], 'week': req.params.week});
});

app.get('/trip-description', (req, res, next) => {
    res.status(400).send('Incorrect trip URL');
});*/

app.get('/booking/:id', async (req, res) => {
    try {
        res.status(200).render('booking', {'offer': await getTrip(req.params.id)});
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/booking', (req, res, next) => {
    res.status(400).send('Incorrect booking URL');
});

/*

app.get('/example-template', (req, res) => {
    res.status(200).render('example');
});

app.get('/data', (req, res) => {
    res.status(200).send(`${res.locals.maintenance_text}`);
});

app.get('/strona-testowa', (req, res) => {
    let x = 0;
    for(let i = 0; i < 1_000_000_000; i++)
        x += Math.random();
    res.status(200).send("Hello world from GET");
});

app.post('/strona-testowa', (req, res) => {
    res.status(200).send("Hello world from POST");
});

app.get('/strona-testowa-timeout', (req, res) => {
    setTimeout(() => res.status(200).send("Hello world from GET"), 10000);
}); */

// Static files
app.use(express.static('public'));

// 404 NOT FOUND
app.use((req, res, next) => {
    res.status(404).send("<h1>404 Page not found</h1>");
});

app.listen(8080);