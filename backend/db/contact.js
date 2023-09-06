const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:String,
    email:String,
    msg:String
});

module.exports = mongoose.model("contact",contactSchema);