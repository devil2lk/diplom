let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TechnicSchema = new Schema({
    type_t: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    maker: {
        type: String,
        required: false
    },
    date_make: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Technic', TechnicSchema);
