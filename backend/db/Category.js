const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    img:String,
    hj:String,
    title:String
});

module.exports = mongoose.model("categorys",categorySchema);