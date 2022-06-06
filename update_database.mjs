// Taka wersja import pozwoli obsłużyć ewentualne błędy...

const { database, Wycieczka, Zgloszenie } = await import('./database.mjs');

let wycieczka1, wycieczka2;

try {
    wycieczka1 = await Wycieczka.create({
        nazwa: "Wycieczka 1",
        opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut nisi porta, molestie nisi quis, consectetur mauris. Donec euismod metus non arcu pharetra, sed accumsan lectus maximus. Vestibulum imperdiet orci at condimentum fermentum. Pellentesque mollis tellus mauris, non sagittis lacus maximus a. Proin quis suscipit sapien, id feugiat ex. Aenean eu neque molestie, scelerisque libero rhoncus, tincidunt quam. Sed non bibendum dui, sed dapibus libero. Proin eu feugiat enim. Morbi vel eros lobortis, suscipit tortor nec, rhoncus augue. Etiam ipsum ligula, gravida vitae enim dapibus, ornare tristique metus. Duis fringilla odio at felis accumsan, non luctus ipsum posuere. Aliquam at facilisis elit. Duis malesuada dolor nec aliquet posuere. Nullam erat ante, accumsan sed nulla sed, interdum porttitor tellus. Nunc rutrum massa non scelerisque interdum. Quisque turpis velit, scelerisque eu fermentum ut, lobortis eget nulla. Aenean condimentum magna eu magna commodo maximus. Nam facilisis tortor et ex lacinia, ac blandit neque finibus. Nam dictum malesuada sem, at efficitur tortor porttitor at. Quisque porta purus felis, dictum euismod orci posuere et. Quisque ex nunc, tincidunt id facilisis in, cursus vulputate nibh. Pellentesque efficitur sem sit amet scelerisque eleifend. Ut elementum, tortor sit amet vestibulum semper, nulla purus lobortis massa, nec blandit ex tellus ac justo. Ut porttitor ligula in diam venenatis faucibus. ',
        krotki_opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue faucibus lobortis. Suspendisse id vestibulum turpis. Vivamus fringilla nibh bibendum ipsum gravida pulvinar.',
        cena: 1231,
        data_poczatku: new Date("2022-10-10"),
        data_konca: new Date("2022-10-12"),
        dostepne_miejsca: 100
    });
    wycieczka2 = await Wycieczka.create({
        nazwa: "Wycieczka 2",
        opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut nisi porta, molestie nisi quis, consectetur mauris. Donec euismod metus non arcu pharetra, sed accumsan lectus maximus. Vestibulum imperdiet orci at condimentum fermentum. Pellentesque mollis tellus mauris, non sagittis lacus maximus a. Proin quis suscipit sapien, id feugiat ex. Aenean eu neque molestie, scelerisque libero rhoncus, tincidunt quam. Sed non bibendum dui, sed dapibus libero. Proin eu feugiat enim. Morbi vel eros lobortis, suscipit tortor nec, rhoncus augue. Etiam ipsum ligula, gravida vitae enim dapibus, ornare tristique metus. Duis fringilla odio at felis accumsan, non luctus ipsum posuere. Aliquam at facilisis elit. Duis malesuada dolor nec aliquet posuere. Nullam erat ante, accumsan sed nulla sed, interdum porttitor tellus. Nunc rutrum massa non scelerisque interdum. Quisque turpis velit, scelerisque eu fermentum ut, lobortis eget nulla. Aenean condimentum magna eu magna commodo maximus. Nam facilisis tortor et ex lacinia, ac blandit neque finibus. Nam dictum malesuada sem, at efficitur tortor porttitor at. Quisque porta purus felis, dictum euismod orci posuere et. Quisque ex nunc, tincidunt id facilisis in, cursus vulputate nibh. Pellentesque efficitur sem sit amet scelerisque eleifend. Ut elementum, tortor sit amet vestibulum semper, nulla purus lobortis massa, nec blandit ex tellus ac justo. Ut porttitor ligula in diam venenatis faucibus. ',
        krotki_opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue faucibus lobortis. Suspendisse id vestibulum turpis. Vivamus fringilla nibh bibendum ipsum gravida pulvinar.',
        cena: 72347,
        data_poczatku: new Date("2022-1-10"),
        data_konca: new Date("2022-1-12"),
        dostepne_miejsca: 200
    });

    console.log('Trips added to database');
} catch (err) {
    console.log('Could not add trip to database', err);
}

/*try {
    await Zgloszenie.create({
        imie: "John",
        nazwisko: "Smith",
        email: "email@email.com",
        liczba_miejsc: 1,
        WycieczkaId: wycieczka1.id
    });
    await Zgloszenie.create({
        imie: "Steven",
        nazwisko: "Armstrong",
        email: "email@email.com",
        liczba_miejsc: 42,
        WycieczkaId: wycieczka1.id
    });

    console.log('Bookings added to database');
} catch (err) {
    console.log('Could not add booking to database', err);
}*/