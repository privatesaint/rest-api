const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const CusomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    }
})
CusomerSchema.plugin(timestamp);
const Customer = mongoose.model('Customer', CusomerSchema);
module.exports = Customer;