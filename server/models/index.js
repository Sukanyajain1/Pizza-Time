const mongoose = require("mongoose"); //importing mongoose
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.sauce = require("./sauce.model");
db.topping = require("./topping.model");
db.pizzaSize = require("./pizzaSize.model");
db.crust = require("./crust.model");
db.deliveryMethod = require("./deliveryMethod.model");

// db.TOPPINGS = ["pepperoni", "chicken", "groundBeef", "olives", "onions", "mushrooms", "pineapples", "bellPeppers", "spinach"];


module.exports = db;