# BoomCar - Node.js application

This is a Node.js application that exposes endpoints for a Rental Car booking application.

This model application is built with Node.js + Express.js, with files being stored as JSON, and the application is CORS enabled. The services are built with Microservices approach. 

The following operations can be performed with the endpoints exposed by BoomCar application

### Features:
1.	List all users and their cars with available date and time
2.	Lists the detail of each User
3.	Allows to add user and car along with availability
4.	Lists all cars and their availability
5.	Lists the details of a particular car
6.	Allows to add/edit/update cars availability

The following are the end points and they are also available as ARC endpoint JSON file iat the following location (endpoints/arc-data-export-boomcar.json)

### Available endpoints:
1.	/cars – GET method - List all users and their cars with availability date and time
2.	/cars/:id – GET – Lists the details of user bearing the ‘id’
3.	/cars – POST – To add user and car data & timings
a.	Request Body:
`{
  "id": 10,
  "cust_name": "Barrack Obama",
  "mobile1": 601234567890,
  "car_name": "BMW E series",
  "car_brand": "BMW",
  "car_model": "E250",
  "car_make_year": "2018",
  "avl_date_from": "",
  "avl_time_from": "9999",
  "avl_date_to": "",
  "avl_time_to": "1300",
  "car_id": "99880"
}`
4.	/timings – GET – Lists all cars with the available date and time
5.	/timings/:carId – GET – Lists the details of car with ‘carId’
6.	/timings/:carId – PUT – To add/update availability date and time
a.	Request body:
`{
  "avlTimeFrom": "9999",
  "avlTimeTo": "1300",
  "avlDateFrom": "24/10/2019",
  "avlDateTo": "24/10/2019"
}`

### Installation:

The application can be installed downloading this code to your system, navigate to the root directory, and run the following command.

#### `yarn install` or `npm install`

The above command installs all dependencies required to run the node.js application. 

To start the app, run the following command

#### `npm start`

Once you could find the message ‘Server started successfully’ message in the console, open ARC from Chrome apps. The application is accessible at `http://localhost:3100/`

Follow the link to install ARC to chrome extensions.

https://webkul.com/blog/advanced-rest-clientapi-testing-tool/

Once ARC opens, import the JSON file from endpoints folder in root (endpoints/arc-data-export-boomcar.json) to access the endpoints described above.

#### Author:
Athif J --- athifbijli@gmail.com <br />
GitHub and Skype: athifjey
