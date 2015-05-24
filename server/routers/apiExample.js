var reportController = require('../controllers/reportController'),
    eventController = require('../controllers/eventController'),
    GlobalController = require('../controllers/GlobalController'),
    adminController = require('../controllers/adminController'),
    fileController = require('../controllers/fileController'),
    ACController = require('../controllers/ACController'),
    ProfileController = require('../controllers/ProfileController'),
    Email = require('../utils/Email');

var express = require('express');

module.exports = (function() {
    'use strict';
    var api = express.Router();

    var checkAdminOrHamalMember = function (req, res, next) {
        if (!req.session && !req.session.role) {
            res.sendStatus(401);
        } else {
            if (req.session.role == 2 || req.session.role == 1) {
                next();
            } else {
                res.sendStatus(401);
            }
        }
    }
    var checkAdminRole = function (req, res, next) {
        if (!req.session && !req.session.role) {
            res.sendStatus(401);
        } else {
            if (req.session.role == 1) {
                next();
            } else {
                res.sendStatus(401);
            }
        }
    }
    var checkHanalMemberRole = function(req, res, next) {
        if (!req.session && !req.session.role) {
            res.sendStatus(401);
        } else {
            if (req.session.role == 2 || req.session.role == 1) {
                next();
            } else {
                res.sendStatus(401);
            }
        }
    }

    // everyone
    api.get('/uploads/:mypic', fileController.getFileByName);
    api.get('/clientInfo', GlobalController.clientInfo);
    api.get('/admin/codes', adminController.codeslist);
    api.post('/fileupload', fileController.fileUpload);
    api.post('/sendToMe', reportController.sendToMe);
    api.post('/pushComment', reportController.pushComment);
    api.get('/getReportById', reportController.getReportsById);
    api.post('/getReports', reportController.getReports);
    api.post('/getReports24h', reportController.getReports24h);
    api.post('/getReports7d', reportController.getReports7d);
    api.post('/eventForecast', eventController.eventForecast);
    api.post('/getHamalNames', eventController.getHamalNames);
    api.post('/savePreset', reportController.savePreset);
    api.post('/loadPresets', reportController.loadPresets);
    api.post('/deletePreset', reportController.deletePreset);
    api.get('/exportTable', reportController.exportTable);


    api.post('/getEvents', eventController.getEvents);


    // depend on user role
    api.post('/confirmReport', checkAdminOrHamalMember, reportController.confirmReport);
    api.post('/getAllSharedReports', checkAdminOrHamalMember, reportController.getAllSharedReports);
    api.post('/getAllUnreadSharedReports', checkAdminOrHamalMember, reportController.getAllUnreadSharedReports);
    api.post('/insertReports', checkAdminOrHamalMember  , reportController.insertReports);
    api.post('/editReport',    checkAdminOrHamalMember  , reportController.editReport);
    api.post('/changeStatus',  checkAdminOrHamalMember  , reportController.changeStatus);
    api.post('/insertEvent',   checkAdminRole           , eventController.insertEvent);
    api.post('/insertHamal',   checkAdminRole           , eventController.insertHamal);
    api.post('/updateHamal',   checkAdminOrHamalMember  , eventController.updateHamal);
    api.post('/deleteHamal',   checkAdminRole           , eventController.deleteHamal);
    api.post('/getHamals', checkAdminOrHamalMember  , eventController.getHamals);
    api.post('/hamalShare',     checkAdminOrHamalMember  , reportController.hamalShare);
    //api.post('/getHamalById', eventController.getHamalById);

    //autocomplete
    api.get('/autocomplete/user',     checkAdminOrHamalMember   , ACController.completeUser);
    api.get('/autocomplete/computer', checkAdminRole   , ACController.completeComputer);
    api.get('/autocomplete/group',    checkAdminRole   , ACController.completeGroup);

    api.post('/admin/checkGroup', checkAdminRole       , adminController.checkGroup);
    api.post('/admin/checkUser', checkAdminRole        , adminController.checkUser);

    //admin
    //api.delete('/admin/removefile/:caseid/:filename', checkAdminRole, fileController.removeFileByName);



    return api;
})();
