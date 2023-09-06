const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product");
const cart = require('./db/cart');
const Category = require('./db/Category');
const Detail = require('./db/Detail');
const contact = require('./db/contact');
const app = express();

app.use(express.json());
app.use(cors());
//make routes for signup page
app.post("/register", async (req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    res.send(result);
})
// make route for login page
app.post("/login",async(req,res)=>{
    console.log(req.body)
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user)
        {
            res.send(user)
        }else{
            res.send({result:"No User Found"})
        }
    }else{
        res.send({result:"No User Found"})
    }
})

// make route for add-product page

app.post("/add-product",async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

//get product

app.get("/products",async(req,res)=>{
    let product = await Product.find();
    if(product.length>0){
        res.send(product)
    }else{
        res.send({result:"no product found"})
    }
})

app.get("/search/:key",async(req,res)=>{
    let result = await Product.find({
        "$or":[
            {brandName:{$regex:req.params.key}},
            {title:{$regex:req.params.key}},
            {price:{$regex:req.params.key}}
        ]
    })
    res.send(result)
});
// //service for cart
// app.post("/carts",async(req,res)=>{
//     let Cart = new cart(req.body);
//     let result = await Cart.save();
//     res.send(result);
// })

// app.get("/get-carts",async(req,res)=>{
//     let Cart = await cart.find();
//     if(Cart.length>0){
//         res.send(Cart)
//     }else{
//         res.send({result:"no product found"})
//     }
// });

//category service

app.post("/add-category",async(req,res)=>{
    let category = new Category(req.body);
    let result = await category.save();
    res.send(result);
});

app.get("/get-category",async(req,res)=>{
    let category = await Category.find();
    if(category.length>0){
        res.send(category)
    }else{
        res.send({result:"no product found"})
    }
});

//sub category

app.post("/add-detail",async(req,res)=>{
    let detail = new Detail(req.body);
    let result = await detail.save();
    res.send(result);
});

app.get("/get-detail",async(req,res)=>{
    let detail = await Detail.find();
    if(detail.length>0){
        res.send(detail)
    }else{
        res.send({result:"no product found"})
    }
});

//contact information
app.post("/add-contact",async(req,res)=>{
    let Contact = new contact(req.body);
    let result = await Contact.save();
    res.send(result);
})

//Add to cart
app.post("/add-to-cart",async(req,res)=>{
    const addedProduct = await Product.findById(req.body.id)[0];
    cart.save(addedProduct);
    console.log(cart.getCart());
    res.end('saved succesfully');
});


app.listen(5000);