var wordController = require('../controllers/wordController');
var express = require('express');

module.exports = (function() {
    'use strict';
    var api = express.Router();

    // everyone
    // api.get('/import', wordController.import2mongo);
    api.post('/words', wordController.get10Words);
    api.post('/import', wordController.postMeJson);

    return api;
})();
