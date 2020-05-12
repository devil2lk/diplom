let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Type_tSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Type_t', Type_tSchema);
