const mongoose = require("mongoose");

// purpose of this file is to describe how our products table (collection) should look

const PizzaSchema = new mongoose.Schema({
    deliveryMethod: {},
    size: {},
    crust: {},
    quantity: {},
    toppings: {},
    price: {},
}, {timestamps:true})


const Pizza = mongoose.model("Pizza", PizzaSchema);

module.exports = Pizza;