import { Sequelize, DataTypes } from 'sequelize';

// const database = new Sequelize('sqlite:test.db');
const database = new Sequelize('test', 'login', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

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
      min: 0
    }
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

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

const User = database.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Wycieczka.hasMany(Zgloszenie, {
  onDelete: 'CASCADE'
});
Zgloszenie.belongsTo(Wycieczka);

try {
  console.log('Connecting to database...');
  await database.authenticate();
  console.log('Done.');
} catch (err) {
  console.error('Unable to connect to the database:', err);
}

try {

  console.log('Synchronizing database...');
  await database.sync();
  console.log('Done.');
} catch (err) {
  console.error('Unable to sync the database:', err);
}

export { database, Wycieczka, Zgloszenie, User };
