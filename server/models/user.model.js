const mongoose = require("mongoose");

// purpose of this file is to describe how our products table (collection) should look

const UserSchema = new mongoose.Schema({
    firstName: {},
    lastName: {},
    email: {},
    password: {},
    confPassword: {},
    streetAddress: {},
    city: {},
    state: {},
    favoriteOrders: {},
    orderHistory: {},
}, {timestamps:true})


const User = mongoose.model("User", UserSchema);

module.exports = User;