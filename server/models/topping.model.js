const mongoose = require("mongoose");

// purpose of this file is to describe how our products table (collection) should look

const ToppingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    checkedKey: {
        type: String
    }
}, {timestamps:true})


const Topping = mongoose.model("Topping", ToppingSchema);

module.exports = Topping;

// initial() function helps us to create important rows in Toppings collection.
module.exports.initial=()=>{
    Topping.find({}).then((docs)=>{
        // console.log(docs, "this is docs");
        console.log(docs.length, "this is number of toppings");
        if (docs.length === 0) {
            new Topping({
                name: "Pepperoni",
                price: 0.50,
                checkedKey: "isPepperoni"
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'pepperoni' to toppings collection");
            });

            new Topping({
                name: "Chicken",
                price: 0.50,
                checkedKey: "isChicken"
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'chicken' to toppings collection");
            });
            
            new Topping({
                name: "Ground Beef",
                price: 0.75,
                checkedKey: "isGroundBeef"
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'groundBeef' to toppings collection");
            });
            
            new Topping({
                name: "Olives",
                price: 0.50,
                checkedKey: "isOlives"
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'olives' to toppings collection");
            });
            
            new Topping({
                name: "Onions",
                price: 0.50,
                checkedKey: "isOnions"
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'onions' to toppings collection");
            });
            
            new Topping({
                name: "Mushroom",
                price: 0.50,
                checkedKey: "isMushroom"
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'mushrooms' to toppings collection");
            });
            
            new Topping({
                name: "Pineapple",
                price: 0.60,
                checkedKey: "isPineapple"
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'pineapples' to toppings collection");
            });
            
            new Topping({
                name: "Bell Peppers",
                price: 0.50,
                checkedKey: "isBellPeppers"
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'bellPeppers' to toppings collection");
            });
            
            new Topping({
                name: "Spinach",
                price: 0.75,
                checkedKey: "isSpinach"
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'spinach' to toppings collection");
            });            
        }
    }).catch(err=>{
        console.log("COUNTER ERROR", err)
    })
}