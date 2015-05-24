//*********************** globals variables configuration **********************************

// dev
global.DB_HOST = 'ds027491.mongolab.com';
global.DB_NAME = 'togblog';
global.DB_PORT = 27491;
global.DB_USERNAME = 'togadmin';
global.DB_PASSWORD = '1q2w3e4r';
global.CONNECTION_STRING = 'mongodb://' + global.DB_USERNAME +':' + global.DB_PASSWORD +'@' +global.DB_HOST + ':' + global.DB_PORT + '/' + global.DB_NAME;
//mongodb://<dbuser>:<dbpassword>@ds027491.mongolab.com:27491/togblog

// prod
//global.DB_HOST = '';
//global.DB_NAME = '';
//global.DB_PORT = 27017;
//global.DB_USERNAME = '';
//global.DB_PASSWORD = '';
//global.CONNECTION_STRING = 'mongodb://' + global.DB_HOST + ':' + global.DB_PORT + '/' + global.DB_NAME;

//******************************* require dependencies ************************************
var express = require('express');
var app = express();
var Mongoose = require("mongoose");
//var logger = require('./server/utils/logger');
var http = require('http');
var bodyParser = require('body-parser');
//var api = require('./server/routers/api');
var static_resource = require('./server/routers/static');

//********************************* connect to db ****************************************
Mongoose.connect(global.CONNECTION_STRING, function(err) {

    if (err) throw err;
  //  logger.info("connected to mongodb sccessfuly");
});

Mongoose.createConnection(global.CONNECTION_STRING, function (err, result) {
    if (err)
        console.log(err);
    if (result)
        console.log(result);
});

//******************************** body parseer for req body ******************************
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//************************************* server: web services ******************************

app.use('/', function (req, res, next) {
    next();
});

//****************** User Authentication ******************************
//app.use('/', sso);

//****************** static resource *****************************
app.use('/', static_resource);

//****************** api restfull ********************************
//app.use('/api', api);

//******************* default route ***************************
//app.all("/*", function (req, res) {
//    res.sendFile(__dirname + '/client/views/index.html');
//});

//*******


var port = process.env.PORT || 5000;
app.server = http.createServer(app);
app.server.listen(port, function() {
  //  logger.info("NodeJs Web Server Started sccessfuly");
    console.log('Server Is Running \n I\'m Listening... on port: ' + port);
});
