// require http modules first

const http = require('http');
const env = require('./config/env.json')

//import app.js file
const app = require('./app');

const port = process.env.PORT || env.boomCar.port;
const server = http.createServer(app);

server.listen(port, () => {
    //    let's print a message when the server run successfully
    console.log("Server restarted successfully")
});