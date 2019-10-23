const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var fs = require('fs');

// const cars = require('../data/cars.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var cars;
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
// handle incoming request to /cars
router.get('/', (req, res, next) => {
    

    console.log(cars)
        if (cars.length != 0) {
            res.status(200).json({
                success: true,
                cars: cars
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: 'No cars found'
            });
        }
    });


// handle incoming request to /cars/{id}
router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    var filteredCars = cars.filter((obj) => {
        if (obj.id === id) {
            return obj;
        }
    })

    if (filteredCars.length > 0) {
        res.status(200).json({
            success: true,
            cars: filteredCars
        });
    } else {
        res.status(200).json({
            success: false,
            message: 'No cars found for this ID'
        });
    }
});


// To add car data
router.post('/', (req, res) => {
    let newCarData = req.body;
    cars.push(newCarData);
    cars.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    json = JSON.stringify(cars);

    fs.writeFile('./data/cars.json', json, 'utf8', (err) => {
        if (err) { throw err }
        else console.log('New car data added to JSON!');
    });

    return res.status(200).send({
        success: 'true',
        message: 'Car added successfully',
        newCarData
    });
})




// To update car data
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let itemIndex;
    var filteredCars = cars.filter((obj, index) => {
        if (obj.id === id) {
            itemIndex = index;
            return obj;
        }
    })

    if (!filteredCars) {
        return res.status(404).send({
            success: 'false',
            message: 'Car not found',
        });
    }

    if (!req.body.avlTimeFrom) {
        return res.status(400).send({
            success: 'false',
            message: 'avlTimeFrom is required',
        });
    } else if (!req.body.avlTimeTo) {
        return res.status(400).send({
            success: 'false',
            message: 'avlTimeTo is required',
        });
    }
    console.log(filteredCars)
    const updatedCarData = {
        id: filteredCars[0].id,
        cust_name: filteredCars[0].cust_name,
        mobile1: filteredCars[0].mobile1,
        car_id: filteredCars[0].car_id,
        car_name: filteredCars[0].car_name,
        car_brand: filteredCars[0].car_brand,
        car_model: filteredCars[0].car_model,
        car_make_year: filteredCars[0].car_make_year,
        avl_date_from: filteredCars[0].avl_date_from,
        avl_time_from: req.body.avlTimeFrom || filteredCars[0].avl_time_from,
        avl_date_to: filteredCars[0].avl_date_to,
        avl_time_to: req.body.avlTimeTo || filteredCars[0].avl_time_to
    };

    cars.splice(itemIndex, 1);
    cars.push(updatedCarData);
    cars.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    json = JSON.stringify(cars);

    fs.writeFile('./data/cars.json', json, 'utf8', (err) => {
        if (err) { throw err }
        else console.log('Data saved!');
    });
    // db.splice(itemIndex, 1, updatedTodo);

    return res.status(200).send({
        success: 'true',
        message: 'Car details updated successfully',
        updatedCarData,
    });
});


module.exports = router;