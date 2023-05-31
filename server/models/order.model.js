// add toggle variable to the order purchase submit button to make sure that delivery method stays pre-populated after first time filling out the pizza form for adding multiple pizzas to the order so that each order has a delivery method for all pizzas requested. NOT one delivery method per each pizza in the single order.

const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');


const OrderSchema = new mongoose.Schema ({
    deliveryMethod: {
        type: String,
        required: [true, 'Delivery Method is required'],
        enum: ['Carry Out', 'Home Delivery']
    },
    isFavorite: {
        type: Boolean
    },
    totalBeforeTax: {
        type: Number,
        required: [true, 'Order Total is required'],
        min: [0.01, 'Order cannot be $0. Please add a pizza to your order.']
    },
    totalAfterTax: {
        type: Number,
        required: [true, 'Order Total is required'],
        min: [0.01, 'Order cannot be $0. Please add a pizza to your order.']
    },

    // add the user._id for the user that created this object
    user_id: {
        type: mongoose.Schema.Types.ObjectId, //this is my Order Type
        ref: "Order" //this is the name of my Order Model from the order.model.js
    }
    }, {timestamps: true}
);




module.exports = mongoose.model ('Order', OrderSchema);