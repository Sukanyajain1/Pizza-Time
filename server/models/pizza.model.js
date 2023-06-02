const mongoose = require("mongoose");

// purpose of this file is to describe how our products table (collection) should look
// Mongoose Map is a subclass of JavaScript's Map class (HASHMAPS). 

const PizzaSchema = new mongoose.Schema({
    pizzaSize: {
        type: String,
        required: [true, 'Size is required'],
        enum: [
            "Large",
            "Medium",
            "Small",
        ]
    },
    crust: {
        type: String,
        required: [true, 'Crust is required'],
        enum: [
            "Thin Crust",
            "Flat Bread",
            "Stuffed Crust",
            "Garlic Parm",
            "Cheese Crust",
            "Classic"
        ]
    },
    sauce: {
        type: String,
        required: [true, 'Sauce is required'],
        enum: [
            "Classic Marinara",
            "Cheesy Alfredo",
            "Fresh Basil Pesto"
        ]
    },
    orderStatus: {
        type: String,
        required: [true, 'Sauce is required'],
        enum: [
            "pending",
            "submitted"
        ]
    },
    toppings: {
        type: [String],
        default: undefined
    },
    price: {
        pizzaSize: {
            type: Number,
            required: [true, 'size price is required']
        },
        crust: {
            type: Number,
            required: [true, 'crust price is required']
        },
        toppings: {
            type: Number,
            required: [true, 'toppings price is required']
        },
        total: {
            type: Number,
            required: [true, 'Total Price is required'],  
            min: [0.01, 'Total Price cannot be $0. Please review your pizza.']
        }
    },
    // add the user._id for the user that created this object
    user_id: {
        type: mongoose.Schema.Types.ObjectId, //this is my User Type
        ref: "User" //this is the name of my user Model from the user.model.js
    }
}, {timestamps:true})


const Pizza = mongoose.model("Pizza", PizzaSchema);

module.exports = Pizza;