const mongoose = require('mongoose');

const bookinfo = mongoose.Schema({
    email: { type: String, required: true},
    name: { type: String, required: true},
    bookname: { type: String, required: true},
    bookauthor: { type: String, required: false},
    isbn: { type: String, required: false},
    language: { type: String, required: true},
    preis: { type: String, required: true},
})

module.exports = mongoose.model('bookinfo',bookinfo);