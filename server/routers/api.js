var wordController = require('../controllers/wordController');
var express = require('express');

module.exports = (function() {
    'use strict';
    var api = express.Router();

    // everyone
   // api.get('/import', wordController.import2mongo);
   api.get('/words', wordController.get10Words);

    return api;
})();
