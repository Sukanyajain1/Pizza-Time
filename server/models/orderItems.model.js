// add toggle variable to the order purchase submit button to make sure that delivery method stays pre-populated after first time filling out the pizza form for adding multiple pizzas to the order so that each order has a delivery method for all pizzas requested. NOT one delivery method per each pizza in the single order.

const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');


const OrderItemsSchema = new mongoose.Schema ({
    // add the user._id for the user that created this object
    order_id: {
        type: mongoose.Schema.Types.ObjectId, //this is my Order Type
        ref: "Order" //this is the name of my Order Model from the order.model.js
    },
    // add the user._id for the user that created this object
    pizza_id: [{
        type: mongoose.Schema.Types.ObjectId, //this is my Pizza Type
        ref: "Pizza" //this is the name of my Pizza Model from the pizza.model.js
    }]
    }
);




module.exports = mongoose.model ('Order', OrderItemsSchema);