const mongoose = require("mongoose")

const PizzaSchema = new mongoose.Schema ({
    crust: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crust',
        required: true
    },
    pizzaSize: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PizzaSize',
        required: true
    },
    toppings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topping'
    }],
    sauce: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sauce',
        required: true
    },
    price: {
        type: Number,
        required: [true, "Pizza price is required."],
        min: [1, "Pizza price cannot be less than $1."]
    },
    orderStatus: {
        type: String,
        required: [true, "Order status is required."]
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