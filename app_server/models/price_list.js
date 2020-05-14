let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Price_listSchema = new Schema({
    type_t: {
        type: String,
        required: false
    },
    name_service: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Price_list', Price_listSchema);
