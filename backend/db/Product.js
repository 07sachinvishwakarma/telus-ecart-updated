const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:Number,
    offerText:String,
    brandName:String,
    image:String,
    hj:String,
    title:String,
    price:String,
    qnty:Number,
    userID:String
    
});

module.exports = mongoose.model("products",productSchema);