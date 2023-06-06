const mongoose = require("mongoose")

const PizzaSchema = new mongoose.Schema ({
    crust: {
        type: String,
        required: [true, "Crust is required!"]
    },
    pizzaSize: {
        type: String,
        required: [true, "Pizza size is required!"]
    },
    toppings: [{
        type: String
    }],
    sauce: {
        type: String,
        required: [true, "Sauce is required!"]
    },
    price: {
        type: Number,
        required: [true, "Pizza price is required."],
        min: [1, "Pizza price cannot be less than $1."]
    },
    orderStatus: {
        type: String,
        required: [true, "Order status is required."],
        enum: ["pending", "submitted"]
    },
    // add the user._id for the user that created this object
    user_id: {
        type: mongoose.Schema.Types.ObjectId, //this is my User Type
        ref: "User" //this is the name of my User Model from the user.model.js
    },
    }, {timestamps: true}
);

const Pizza = mongoose.model("Pizza", PizzaSchema);

module.exports = Pizza;