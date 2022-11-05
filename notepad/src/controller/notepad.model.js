const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let note = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    id: {
        type: String
    }
}, {
    collection: 'notes'
});

module.exports = mongoose.model('Note', note);

