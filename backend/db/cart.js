const mongoose = require('mongoose');
let cart = null;
module.exports = class cart{
     static save(product){
          if(cart){//cart is not null
            const existingProductIndex = cart.products.findIndex( p => {p.id == product.id});//to check product is exist or not
            console.warn('existingProductIndex: ',existingProductIndex);
            if(existingProductIndex>0){//exist
                 const existingProduct = cart.product[existingProductIndex];
                 existingProduct.qty += 1;
                 cart.totalPrice += product.price;
            }else{//not exist
                     product.qty = 1;
                     cart.product.push(product);
                     cart.totalPrice += product.price;
            }
          }else{
            cart = {products:[],totalPrice:0};
            product.qty = 1;
            cart.product.push(product);
            cart.totalPrice = product.price;
          }
     }
     
     static getCart(){
        return cart;
     }
}