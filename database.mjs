import { Sequelize, DataTypes } from 'sequelize';

// Połączenie z bazą danych - lepiej użyć Postgresa (zadanie 0, patrz również niżej)
// Czy to może skończyć się błędem?
const database = new Sequelize('sqlite:test.db');
/*const database = new Sequelize('test', 'login', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});*/  

// Zadanie 1
const Wycieczka = database.define('Wycieczka', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nazwa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  opis: DataTypes.TEXT,
  krotki_opis: DataTypes.TEXT,
  cena: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1
    }
  },
  data_poczatku: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      is_before(value) {
        if (value > this.data_konca) {
          throw new Error("Begin date must be before end date");
        }
      }
    }
  },
  data_konca: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  dostepne_miejsca: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1
    }
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

// Zadanie 2
const Zgloszenie = database.define('Zgloszenie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  imie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nazwisko: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  liczba_miejsc: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1
    }
  }
}, {
  freezeTableName: true,
  timestamps: false
});

// Zadanie 3
// Tu dodaj kod odpowiedzialny za utworzenie relacji pomiędzy modelami db.Wycieczka i db.Zgloszenie

Wycieczka.hasMany(Zgloszenie, {
  onDelete: 'CASCADE'
});
Zgloszenie.belongsTo(Wycieczka);

// Zadania 4-6 w innych plikach

// ========================================
// Zadanie 0 - kontynuacja; proszę napisać kod poniżej, wg komentarzy

try {
  // Sprawdzenie poprawności połączenia (authenticate; co się dzieje, gdy błąd?)
  console.log('Connecting to database...');
  await database.authenticate();
  console.log('Done.');
} catch (err) {
  // Nawiązywanie połączenia i synchronizacja mogły się nie udać, co wtedy?
  console.error('Unable to connect to the database:', err);
}

try {
  // Jeśli modele zostały zmodyfikowane, to należy zmodyfikować tabele w bazie tak, by były zgodne.
  // Co się stanie z danymi? (sync)
  console.log('Synchronizing database...');
  await database.sync();
  //await database.sync({force: true});
  console.log('Done.');
} catch (err) {
  console.error('Unable to sync the database:', err);
}

export { database, Wycieczka, Zgloszenie };
