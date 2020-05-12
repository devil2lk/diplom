let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ClientSchema = new Schema({
    last_name: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    middle_name: {
        type: String,
        required: false
    },
    phone_number: {
        type: String,
        required: false
    },
    e_mail: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Client', ClientSchema);
