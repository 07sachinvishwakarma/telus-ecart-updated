const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    title:String,
    hj:String,
    image:String
});

module.exports = mongoose.model("details",detailSchema);