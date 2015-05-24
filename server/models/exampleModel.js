var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('reports', new Schema({
    _id: {
        type: Number,
        required: true
    },
    reporterName: {
        type: {
            username: { type: String, required: true },
            displayName: { type: String, required: true }
        },
        required: true
    },
    reporterRuleName: {
        type: String,
        required: true
    },
    createBy: {
        type: {
            username: { type: String, required: true },
            displayName: { type: String, required: true }
        },
        required: true
    },
    hamal: {
        type: String,   //the _id of the hamal is a unique string name
        required: true
    },
    computerName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    reportSource: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    gizra: {
        type: String//,
        //required: true
    },
    mahut: {
        type: Number,
        required: true
    },
    reportType: {
        type: Number,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    attachments: [new Schema({
        name: String,
        displayName: String,
        isImage : Boolean
    })
                 ],
    comments: [new Schema({
        date: Date,
        user: String,
        text: String,
        attachments: [new Schema({
            name: String,
            displayName: String,
            isImage : Boolean
        })]
    })
              ],
    history: [new Schema({
        date: Date,
        user: String,
        action: String
    })
             ],
    reportContenet: {
        type: String
    },
    reportUpdate: [{
        date: Date,
        user: String,
        text: String,
    }],
    tipul: {
        type: String,
        'default': ''
    },
    status: {
        type: Number,
        required: true
    },
    reason: {
        type: String
    },
    shareList: [{
        hamalId: String,
        shareType: Number,
        done: Boolean,
        comment: String,
        _id:false
    }],
    _id: false
}));
