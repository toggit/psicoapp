//****************** globals variables configuration ******************************

// dev
global.DB_HOST = '';
global.DB_NAME = '';
global.DB_PORT = 27017;
global.DB_USERNAME = '';
global.DB_PASSWORD = '';
global.CONNECTION_STRING = 'mongodb://' + global.DB_HOST + ':' + global.DB_PORT + '/' + global.DB_NAME;

// prod
//global.DB_HOST = '';
//global.DB_NAME = '';
//global.DB_PORT = 27017;
//global.DB_USERNAME = '';
//global.DB_PASSWORD = '';
//global.CONNECTION_STRING = 'mongodb://' + global.DB_HOST + ':' + global.DB_PORT + '/' + global.DB_NAME;

//************************ require dependencies **********************************
var express = require('express');
var app = express();
var Mongoose = require("mongoose");
var logger = require('./server/utils/logger');
var http = require('http');
var bodyParser = require('body-parser');
var api = require('./server/routers/api');
var static_resource = require('./server/routers/static');

//****************** connect to db ******************************
Mongoose.connect(global.CONNECTION_STRING, function(err) {

    if (err) throw err;
    logger.info("connected to mongodb sccessfuly");
});

Mongoose.createConnection(global.CONNECTION_STRING, function (err, result) {
    if (err)
        console.log(err);
    if (result)
        console.log(result);
});

//***************** body parseer for req body ********************
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
