var express = require('express');
var dirname = require('../../project_dir');

module.exports = (function() {
    'use strict';
    var static_resource = express.Router();

    static_resource.use('/js', express.static(dirname + '/client/js'));
    static_resource.use("/views", express.static(dirname + '/client/views/'));
    static_resource.use("/css", express.static(dirname + '/client/css/'));
    static_resource.use("/fonts", express.static(dirname + '/client/fonts/'));
    static_resource.use("/images", express.static(dirname + '/client/images/'));
    static_resource.use("/sounds", express.static(dirname + '/client/sounds/'));

    static_resource.get('/', function(req, res) {
        res.sendFile(dirname + '/client/views/index.html');
    });

    return static_resource;
})();
