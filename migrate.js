const express = require('express');
var fs = require('fs');
const morgan = require('morgan');
var Sequelize = require('sequelize');
const env = require('./config/env.json')

const migrate = express();


migrate.use(morgan('dev'));

var fileData;

function fetchData() {
    fs.readFile('./data/cars.json', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }
        fileData = data
        processFile();
    });
}

function processFile() {
    cars = JSON.parse(fileData)
}

fetchData();

var sequelize = new Sequelize(env.dbconn.database, env.dbconn.username, env.dbconn.password, {
    host: env.dbconn.host,
    port: env.dbconn.port,
    dialect: env.dbconn.dialect
});

// Checking connection status
sequelize.authenticate().then(function (err) {
    if (err) {
        console.log('There is connection in ERROR');
    } else {
        console.log('Connection has been established successfully');
    }
});

//Create Item Table Structure
var Cars = sequelize.define('cars', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    custName: {
        type: Sequelize.STRING
    },
    mobile: {
        type: Sequelize.STRING
    },
    carId: {
        type: Sequelize.INTEGER
    },
    carName: {
        type: Sequelize.STRING
    },
    carBrand: {
        type: Sequelize.STRING
    },
    carModel: {
        type: Sequelize.STRING
    },
    carMakeYear: {
        type: Sequelize.INTEGER
    },
    avlDateFrom: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    avlTimeFrom: {
        type: Sequelize.TIME
    },
    avlDateTo: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    avlTimeTo: {
        type: Sequelize.TIME
    }

}, {
        freezeTableName: true,
    });

//Applying Item Table to database
Cars.sync({ force: true }).then(function () {
    // Table created
    return Cars.bulkCreate(cars, { returning: true }
    ).then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
            console.log(error);
        });
}).then(function (response) {
    console.log(response);
})
    .catch(function (error) {
        console.log(error);
    });





module.exports = migrate;