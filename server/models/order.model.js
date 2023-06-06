// add toggle variable to the order purchase submit button to make sure that delivery method stays pre-populated after first time filling out the pizza form for adding multiple pizzas to the order so that each order has a delivery method for all pizzas requested. NOT one delivery method per each pizza in the single order.

const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');


const OrderSchema = new mongoose.Schema ({
    // add the user._id for the user that created this object
    user_id: {
        type: mongoose.Schema.Types.ObjectId, //this is my User Type
        ref: "User" //this is the name of my User Model from the user.model.js
    },
    // add the user._id for the user that created this object
    pizza_id: [{
        type: mongoose.Schema.Types.ObjectId, //this is my Pizza Type
        ref: "Pizza" //this is the name of my Pizza Model from the pizza.model.js
    }],
    deliveryMethod: {
        type: String,
        required: [true, 'Delivery Method is required'],
        ref: 'DeliveryMethod'
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    totalAfterTax: {
        type: Number,
        required: [true, "Order total price is required."],
        min: [12.99, "Order total cannot be less than price of the standard small pizza."]
    }
    }, {timestamps: true}
);




module.exports = mongoose.model ('Order', OrderSchema);