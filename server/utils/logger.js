var winston = require('winston');
var MongoDB = require('winston-mongodb').MongoDB;

var winston = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            level: 'debug'
        }),
        new(winston.transports.File)({
            filename: __dirname + '/../../logs/server_debug.log',
            level: 'debug'
        }),
        new(winston.transports.MongoDB)({
            db: global.DB_NAME,
            host: global.DB_HOST,
          //  port: global.DB_PORT,
            collection: 'logs',
            level: 'debug',
            username : global.DB_USERNAME,
            password : global.DB_PASSWORD
        })
    ]
});

winston.info('Starting server debug logger to console , file and mongodb');

module.exports = winston;
