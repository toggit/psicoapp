var ReportModel = require('../models/reportModel');
var SequenceModel = require('../models/IdModel');
var GroupModel = require('../models/rolesModel');
var CodesModel = require('../models/codesModel');
var ad = require('../utils/ldap');
var fs = require('fs');
var dirname = require('../../project_dir');
var Email = require('../utils/Email');
var async = require('async');
var profileModel = require('../models/profileModel');
var ADusers = require('../models/ADusers');
var userProfile = require('../controllers/profileController');

module.exports.loadPresets = function (req, res) {
    console.log("loadPreset");
    profileModel.findOne({ username: req.session.username }, function (err, result) {
        if (result) {
            res.send({ filterPresets: result.filterPresets, defaultPreset: result.defaultPreset });
        }
        else {
            userProfile.createUserProfile(req.session.username);
            res.sendStatus(500);
        }
    });
};

module.exports.savePreset = function (req, res) {
    console.log("SavePreset");
    if (req.body.presetName != 'ëì äãéååçéí' || req.body.presetName != 'äãéååçéí ùìé')
        profileModel.findOne({ username: req.session.username }, function (err, result) {
            if (result) {
                if (result.filterPresets == undefined) result.filterPresets = {};
                result.filterPresets[req.body.presetName] = req.body.filterPreset;
                if (req.body.isDefault) result.defaultPreset = req.body.presetName;
                if (!req.body.isDefault && result.defaultPreset == req.body.presetName)
                    delete result.defaultPreset;
                profileModel.update({
                    username: req.session.username,
                }, {
                    filterPresets: result.filterPresets,
                    defaultPreset: result.defaultPreset
                }).exec(function (saveErr, result2) {
                    if (err || saveErr) console.log(err || saveErr);
                    else res.send({ filterPresets: result.filterPresets, defaultPreset: result.defaultPreset });
                    console.log("SavePreset2");
                });
            }
        })
        else
            res.sendStatus(500);
};

module.exports.deletePreset = function (req, res) {
    // this how we delete from robomongo shell
    //db.profiles.update({ username: 'tomer' }, { $unset: { "filterPresets.hhhh": "" } })

    profileModel.findOne({ username: req.session.username }, function (err, result) {
        if (result) {
            var _filterPresets = result.toObject();

            if (req.body.name == result.defaultPreset) {
                console.log('deleting the default preset');
                result.defaultPreset = null;
            }

            if (_filterPresets.filterPresets[req.body.name] != undefined)
                delete _filterPresets.filterPresets[req.body.name];
            result.filterPresets = _filterPresets.filterPresets;

            result.save(function (saveErr, result2) {
                if (err || saveErr) console.log(err || saveErr);
                else
                    res.send({ filterPresets: result.filterPresets, defaultPreset: result.defaultPreset });
            });

            //var a = { $unset: { filterPresets: {} } };
            //a.$unset.filterPresets[req.body.name]="";

            //profileModel.update({
            //    username: req.session.username
            //}, a).exec(function (saveErr, result2) {
            //    if (err || saveErr) console.log(err || saveErr);
            //    else res.send({ filterPresets: result.filterPresets, defaultPreset: result.defaultPreset });
            //});
        }
    })
};

var HelperMethod = function (arr1, arr2) {
    var arr3 = arr2.filter(function (elem) {
        var mapTMP = (arr1.map(function (e) { return e.hamalId }));
        return mapTMP.indexOf(elem.hamalId) == -1;
    });
    arr3 = arr3.concat(arr1);
    return arr3;
}


module.exports.exportTable = function (req, res) {
    //var query = JSON.parse(req.param('filter'));
    //var findQuery = filterQuery({}, query);
    var test = [{ firstName: 'aa', lastName: 'bb' },
                { firstName: 'úåîø', lastName: 'âøéðáøâ' },
                { firstName: 'öòéø', lastName: 'ðéâàé' },
                { firstName: 'ggg', lastName: 'hhhhhhh' }
               ];
    ReportModel.find({}).limit(30).exec(function (err, result) {
        if (!err)
            res.xls('someFile.xlsx', test);
        else {
            console.log(err);
            res.sendStatus(501);
        }
    })
}
module.exports.hamalShare = function (req, res) {

    var Data = req.body;
    ReportModel.findById(Data._id, function (err, result) {
        if (result && !err && req.session.role != 0 && validateReport(result, req.session.hamals)) {
            //result.shareList = Data.shareList;
            result.shareList = HelperMethod(result.shareList, Data.shareList);
            result.save(function (err, results) {
                if (!err && results)
                    res.send(results.shareList);
                else
                    res.sendStatus(501);
            });
        }
    });
};

module.exports.confirmReport = function (req, res) {

    var Data = req.body;
    ReportModel.findById(Data._id, function (err, result) {
        if (result && !err) {
            result.shareList = result.shareList.map(function (elem) {
                if (req.session.hamals.indexOf(elem.hamalId) != -1) {
                    elem.done = true;
                    elem.comment = Data.comment;
                }
                return elem;
            })
            result.save(function (err, results) {
                if (!err && results) {
                    res.send(results.shareList);
                    userProfile.markAsUnReadForUsername(results._id, results.createBy.username);
                }
                else
                    res.sendStatus(501);
            });
        }
    });

};

module.exports.getAllSharedReports = function (req, res) {

    var tableParam = req.body;
    var findQuery = { "shareList.hamalId" : { $in: req.session.hamals } };
    tableParam.findQuery = findQuery;
    if (tableParam.pagination.start >= 0)
        GetList(req, res, findQuery, tableParam)
        else
            res.send('');

    //ReportModel.find({ "shareList.hamalId" : { $in: req.session.hamals } }, function (err, result) {
    //    if (!err && result)
    //            res.send(result);
    //        else
    //            res.sendStatus(501);
    //});
};

module.exports.getAllUnreadSharedReports = function (req, res) {

    ReportModel.find({ "shareList.hamalId" : { $in: req.session.hamals } }, function (err, results) {
        if (!err && results)
            profileModel.findOne({ username: req.session.username }, function (err, result_profile) {
                if (result_profile) {
                    results = results.map(function (elem) {
                        elem._doc.isNew = (result_profile.reportsRead.indexOf(elem._id) != -1);
                        return elem;
                    });

                    if (!err)
                        res.send(results)
                        else
                            res.sendStatus(500);
                }
            })
            });
};

module.exports.editReport = function (req, res) {
    var Data = req.body;
    if (req.session.role != 0 && validateReport(Data, req.session.hamals)) {
        ReportModel.findById(Data._id, function (err, result) {
            if (result && !err) {
                if (Data._reportContenet)
                    result.reportContenet += "\r\n" + Data._reportContenet;
                if (Data._tipul)
                    result.tipul += "\r\n" + Data._tipul;
                if (Data.status) {
                    result.status = Data.status;
                    if (result.status == 2 && Data.reason)
                        result.reason = Data.reason;

                }

                if ((result.status == 2 && !Data.reason))
                    res.sendStatus(501);
                else
                    result.save(function (err, results) {
                        if (!err && results)
                            res.sendStatus(200);
                        else
                            res.sendStatus(501);
                    });
            }
        })
    }
    else {
        res.sendStatus(501);
    }

}
module.exports.insertReports = function (req, res) {
    var Data = req.body;

    if (req.session.role != 0 && validateReport(Data, req.session.hamals)) {
        nextId(function (_err, value) {
            if (_err)
                console.log(_err);

            // Here we intialize fields that the server, should create.
            Data._id = value.seq;
            Data.attachments = req.body.attachments;
            Data.creationDate = new Date();
            Data.createBy = {};
            Data.createBy.username = req.session.username;
            Data.computerName = req.session.hostname;
            Data.shareList = [];

            async.waterfall([function (callback) {
                ADusers.findOne({ SamAccountName: Data.createBy.username }, callback)
            }, function (userInfo, callback) {
                Data.createBy.displayName = pickDescription(userInfo);
                ADusers.findOne({ SamAccountName: Data.reporterName.username }, callback)
            }], function (err, userInfo) {
                if (!err) {
                    Data.reporterName.displayName = pickDescription(userInfo);
                    var newReport = new ReportModel(Data);
                    console.log(Data);
                    newReport.save(function (err, result) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(501);
                        } else {

                            if (req.body.attachments && req.body.attachments.length > 0)
                                MoveAttachments2Mongo(req.body.attachments, options, req , res, result);
                            else options(req, res, result);
                        }
                    });
                }
                else {
                    console.log(err);
                    res.sendStatus(500);
                }
            });
        });
    }
    else
        res.sendStatus(501);
};

function pickDescription(userInfo) {
    var description = userInfo.SamAccountName;
    if (userInfo.GivenName) {
        if (userInfo.Surname)
            description = userInfo.GivenName + " " + userInfo.Surname;
        else
            description = userInfo.GivenName;
    }
    else
        if (userInfo.displayName)
            description = userInfo.displayName;
    else if (userInfo.description)
        description = userInfo.description;

    return description;
}

function validateReport(report, userHamals) {
    return (userHamals.indexOf(report.hamal) != -1);
}

function options(req, res, result) {
    res.send(result);
}


// generate new (next) id
var nextId = function (callback) {
    SequenceModel.findOneAndUpdate({
        _id: 'report_id'
    }, {
        $inc: {
            seq: 1
        }
    }, {
        upsert: true
    },
                                   function (err, idDoc) {
        callback(err, idDoc);
    });
};


// write attachment files to mongo when case or new case event is created
function MoveAttachments2Mongo(attachmentNames, callback, req, res, parameters) {
    var i;
    var movedCounter = 0;

    for (i = 0; i < attachmentNames.length; i++) {
        var uploadDir = dirname + '\\uploads\\';

        var gfsWritestream = global.gfs.createWriteStream({ filename: attachmentNames[i].name });
        fs.createReadStream('.\\uploads\\' + attachmentNames[i].name).pipe(gfsWritestream);
        gfsWritestream.on('error', function (err) {
            movedCounter++;
            console.log(err);
        });
        gfsWritestream.on('close', function (file) {
            try {
                movedCounter++;
                console.log('finshed writing file ' + file.filename + ' to mongo');
                fs.unwatchFile(uploadDir + file.name);
                fs.unlink(uploadDir + file.filename, function (err) {
                    if (err) console.log("error: " + err);
                    else console.log("deleted " + file.filename);
                });
                if (movedCounter == attachmentNames.length)
                    callback(req, res, parameters);
            }
            catch (error) { console.log(error); }
        });
    }
}

module.exports.getReports = function (req, res) {

    var tableParam = req.body;


    var findQuery = {};//QueryRuleRestriction(req);
    //if (req.body.isOpen != undefined)
    //    findQuery.isOpen = req.body.isOpen;

    //if (req.body.startdate != undefined && req.body.enddate != undefined) //query and
    //    findQuery.$and = [{ startdate : { $gt: req.body.startdate } }, { startdate : { $lt: req.body.enddate } }];
    //else
    //    if (req.body.startdate != undefined) // startdate only = gt
    //        findQuery.startdate = { $gt: req.body.startdate };
    //    else
    //        if (req.body.enddate != undefined) // enddate only = lt
    //            findQuery.startdate = { $lt: req.body.enddate };


    //if (req.body.site)
    //    findQuery.site = req.body.site;

    //if (req.body.caseType)
    //    findQuery.caseType = req.body.caseType;

    //if (req.body.username)
    //    findQuery.username = req.body.username;

    //if (req.body.openBy)
    //    findQuery.openBy = req.body.openBy;

    //GetList(req, res, findQuery);
    GetList(req, res, findQuery, tableParam);
}
module.exports.getReports24h = function (req, res) {
    var today = new Date();
    var yesterday = (new Date(today.getTime() - 1000 * 60 * 60 * 24));

    var findQuery = {};
    findQuery.$and = [{ date : { $gt: yesterday } }, { date : { $lt: today } }];



    var query = ReportModel.find(findQuery, {});
    query.sort({ date: 1 });
    query.exec(function (err, results) {

        if (!err)
            res.send(results)
            else
                res.sendStatus(500);
    });
};

module.exports.getReports7d = function (req, res) {

    var today = new Date();
    var nextweek = (new Date(today.getTime() + 1000 * 60 * 60 * 24 * 7));

    var findQuery = {};
    findQuery.$and = [{ date : { $gt: today } }, { date : { $lt: nextweek } }];
    findQuery.reportType = 9;

    var query = ReportModel.find(findQuery, {});
    query.sort({ date: 1 });
    query.exec(function (err, results) {

        if (!err)
            res.send(results)
            else
                res.sendStatus(500);
    });
};

function filterQuery(findQuery, filters) {
    if (filters.status_list)
        findQuery.status = { $in: FilterAndMap(filters.status_list) };
    if (filters.source_list)
        findQuery.reportSource = { $in: FilterAndMap(filters.source_list) };
    if (filters.type_list)
        findQuery.reportType = { $in: FilterAndMap(filters.type_list) };
    if (filters.mahut_list)
        findQuery.mahut = { $in: FilterAndMap(filters.mahut_list) };
    if (filters.priority_list)
        findQuery.priority = { $in: FilterAndMap(filters.priority_list) };
    if (filters.hamal_list)
        findQuery.hamal = { $in: FilterAndMap(filters.hamal_list) };

    if (filters.fromDate != undefined && filters.toDate != undefined) //query and
        findQuery.$and = [{ date : { $gt: filters.fromDate } }, { date : { $lt: filters.toDate } }];
    else
        if (filters.fromDate != undefined) // fromDate only = gt
            findQuery.date = { $gt: filters.fromDate };
    else
        if (filters.toDate != undefined) // toDate only = lt
            findQuery.date = { $lt: filters.toDate };
    return findQuery;
}

function FilterAndMap(array) {
    var arr = array.filter(function (elem) { if (elem.visible == true) return elem });
    var answer = arr.map(function (elem) { return elem._id; });
    return answer;
}

// helper method - return list of (close or open) cases
function GetList(req, res, findQuery, tableParam) {

    var skip = 0;
    var limit = 10;
    var sort;
    var searchTerm = "";
    if (tableParam) {
        skip = tableParam.pagination.start;
        limit = tableParam.pagination.number;
        if (tableParam.sort.predicate) {
            sort = {};
            sort[tableParam.sort.predicate] = tableParam.sort.reverse?-1:1;
        }
        if (tableParam.search.predicateObject)
            searchTerm = tableParam.search.predicateObject.$;
        findQuery = filterQuery(findQuery, tableParam.findQuery);
        if (searchTerm != undefined)
            findQuery.$or = [
                //{ startdate: new RegExp('^' + searchTerm, "i") },
                { subject: new RegExp(searchTerm, "i") },
                { place: new RegExp(searchTerm, "i") },
                { 'createBy.displayName': new RegExp(searchTerm, "i") },
                { 'createBy.username': new RegExp(searchTerm, "i") },
                { reportContenet: new RegExp(searchTerm, "i") },
                { 'comments.text': new RegExp(searchTerm, "i") },
                { $where: 'obj._id.toString().indexOf("' + searchTerm.replace('"', '\"') + '")>-1' }]

            //if (!isNaN(searchTerm))
            //    findQuery.$or.push({ _id: parseInt(searchTerm) });
            }

    limit = ((!isNaN(limit) && limit >= 5 && limit <= 100)?limit:10);
    skip = ((!isNaN(skip) && skip >= 0)?skip:0)

    if (!sort)
        sort = { _id: -1 };

    // limit the number of reports requested
    limit = (limit > 100)?100:limit;

    ReportModel.count(findQuery, function (error, reportCount) {
        var query = ReportModel.find(findQuery, {});
        if (tableParam) query.skip(skip).limit(limit).sort(sort);
        query.exec(function (err, results) {
            if (err) console.log(err);
            else
                profileModel.findOne({ username: req.session.username }, function (err, result_profile) {
                    if (result_profile) {
                        results = results.map(function (elem) {
                            elem._doc.isNew = (result_profile.reportsRead.indexOf(elem._id) != -1);
                            return elem;
                        });
                        var result = {
                            results: results,
                            numberOfPages: reportCount >= 0 ? Math.ceil(reportCount / limit): 1,
                            reportCount : reportCount
                        }

                        if (!err)
                            res.send(result)
                            else
                                res.sendStatus(500);
                    }
                })
                });
    });
}

// return case detail by id
module.exports.getReportsById = function (req, res) {

    var findQuery = {};// QueryRuleRestriction(req);
    findQuery._id = parseInt(req.param("reportId"));

    ReportModel.findOne(findQuery, function detailCallback(err, result) {
        if (result != null) {
            userProfile.markAsRead(req.param("reportId"), req.session.username);
            res.json(result);
        } else
            res.sendStatus(404);
    });


};

//TODO: remove this thing.
module.exports.changeStatus = function (req, res) {
    ReportModel.findOneAndUpdate(
        { _id: parseInt(req.body.reportId) },
        {
            status: parseInt(req.body.status)
        },
        { upsert: true },
        function (err, result) {
            res.json(result);
        }
    )
};

module.exports.pushComment = function (req, res) {
    ReportModel.findOne({
        _id: parseInt(req.body.reportId)   // add here role restriction?
    },
                        function (err, results) {
        if (req.body.comment != undefined) {
            req.body.comment.user = req.session.username;
            req.body.comment.date = new Date();
            if (req.body.comment.attachments && req.body.comment.attachments.length > 0)
                MoveAttachments2Mongo(req.body.comment.attachments, AfterFileSave, req , res);
            else
                AfterFileSave(req, res);

            userProfile.markAsUnRead(req.body.reportId, req.session.username);
        }
        else res.sendStatus(400);

    });
};

function AfterFileSave(req, res) {
    ReportModel.findOneAndUpdate(
        { _id: parseInt(req.body.reportId) },
        {
            $push: {
                comments: req.body.comment
            }
        },
        { upsert: true },
        function (err, result) {
            res.json(result);
        }
    )

}


module.exports.sendToMe = function (req, res) {
    //Mail.sendsomething....
    ReportModel.findOne({ _id: req.body._id }, function (err, reportToSend) {
        CodesModel.find({}, function (err, codes) {
            var codesList = {};
            for (i in codes)
                codesList[codes[i]._id] = codes[i].array;

            reportToSend = decodeReport(reportToSend, codesList);
            Email.SendMail(reportToSend, req.session.username);
            res.send('ok');
        });
    })
};
function decodeReport(ReportModel, codesList) {
    //ReportModel._doc.hamal = codesList.hamal[ReportModel.hamal].name;
    ReportModel._doc.reportSource = codesList.source[ReportModel.reportSource].name;
    ReportModel._doc.mahut = codesList.mahut[ReportModel.mahut].name;
    ReportModel._doc.reportType = codesList.type[ReportModel.reportType].name;
    ReportModel._doc.priority = codesList.priority[ReportModel.priority].name;
    ReportModel.statusText = codesList.status[ReportModel.status].name;
    return ReportModel;
}

var roleEnum = {
    normal: 0,
    admin: 1,
    hamalMember: 2
}
// helper Method for queries role restriction
module.exports.QueryRuleRestriction = function (req) {

    var findQuery = {};
    var username = req.session.username;
    var Hamals = req.session.hamals;

    if (req.session.role == roleEnum.normal)
        findQuery.$or = [{ 'username': username }, { 'openBy': username }];

    if (req.session.role == roleEnum.expert)
        findQuery.$or = [{ 'responsibleGroup': { $in: Hamals } },
                         { 'username': username }, { 'openBy': username }];

    if (req.session.role == roleEnum.support)
        findQuery.$or = [{ 'responsibleGroup': { $in: Hamals } }, { 'supportGroup': { $in: Hamals } },
                         { 'username': username }, { 'openBy': username }];

    return findQuery;
}
