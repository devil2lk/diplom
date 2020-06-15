let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let OrdersSchema = new Schema({
    type_t: {
        type: String,
        required: false
    },
    name_service: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    fio_client: {
        type: String,
        required: false
    },
    fio: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Orders', OrdersSchema);
