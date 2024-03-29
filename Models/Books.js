const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        language: { type: String, required: true },
        angebot: { type: String, required: true },
        publication: { type: String, required: true },
        category: { type: String },
        preis: { type: Number, required: true },
        contactName: { type: String, required: false },
        email: { type: String, required: false }
        }
)

module.exports = mongoose.model('books', schema);
