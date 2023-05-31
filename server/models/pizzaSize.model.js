const mongoose = require("mongoose");

// purpose of this file is to describe how our products table (collection) should look

const PizzaSizeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    }
}, {timestamps:true})


const PizzaSize = mongoose.model("PizzaSize", PizzaSizeSchema);

module.exports = PizzaSize;


// initial() function helps us to create important rows in pizza sizes collection.
module.exports.initial=()=>{
    PizzaSize.find({}).then((docs)=>{
        // console.log(docs, "this is docs");
        console.log(docs.length, "this is number of pizza sizes");
        if (docs.length === 0) {
            new PizzaSize({
                name: "Large",
                price: 15.50
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Large' to pizza sizes collection");
            });

            new PizzaSize({
                name: "Medium",
                price: 13.75
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Medium' to pizza sizes collection");
            });

            new PizzaSize({
                name: "Small",
                price: 12.99
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Small' to pizza sizes collection");
            });
        }
    }).catch(err=>{
        console.log("COUNTER ERROR", err)
    })
}