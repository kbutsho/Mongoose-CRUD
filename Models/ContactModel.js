const mongoose = require('mongoose');
const { Schema } = require('mongoose');

let contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 14,
    }
})

let Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;