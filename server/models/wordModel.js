var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('word', new Schema({
    word: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lang: {
        type: String,
        required: true
    },
    char: {
        type: String,
        required: true
    }
}));
