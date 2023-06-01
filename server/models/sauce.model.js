const mongoose = require("mongoose");

// purpose of this file is to describe how our products table (collection) should look

const SauceSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    }
}, {timestamps:true})


const Sauce = mongoose.model("Sauce", SauceSchema);

module.exports = Sauce;


// initial() function helps us to create important rows in sauces collection.
module.exports.initial=()=>{
    Sauce.find({}).then((docs)=>{
        // console.log(docs, "this is docs");
        console.log(docs.length, "this is number of sauces");
        if (docs.length === 0) {
            new Sauce({
                name: "Classic Marinara",
                price: 0
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Classic Marinara' to sauces collection");
            });

            new Sauce({
                name: "Cheesy Alfredo",
                price: 1.25
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Cheesy Alfredo' to sauces collection");
            });

            new Sauce({
                name: "Fresh Basil Pesto",
                price: 0.75
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Fresh Basil Pesto' to sauces collection");
            });
        }
    }).catch(err=>{
        console.log("COUNTER ERROR", err)
    })
}