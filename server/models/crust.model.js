const mongoose = require("mongoose");

// purpose of this file is to describe how our products table (collection) should look

const CrustSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
}, {timestamps:true})


const Crust = mongoose.model("Crust", CrustSchema);

module.exports = Crust;

// initial() function helps us to create important rows in crusts collection.
module.exports.initial=()=>{
    Crust.find({}).then((docs)=>{
        // console.log(docs, "this is docs");
        console.log(docs.length, "this is number of crusts");
        if (docs.length === 0) {
            new Crust({
                name: "Thin Crust",
                price: .40
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Thin Crust' to crusts collection");
            });

            new Crust({
                name: "Flat Bread",
                price: .60
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Flat Bread' to crusts collection");
            });

            new Crust({
                name: "Stuffed Crust",
                price: 2.50
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Stuffed Crust' to crusts collection");
            });

            new Crust({
                name: "Garlic Parm",
                price: 1.00
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Garlic Parm' to crusts collection");
            });

            new Crust({
                name: "Cheese Crust",
                price: 0.40
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Cheese Crust' to crusts collection");
            });

            new Crust({
                name: "Classic",
                price: 0
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Classic' to crusts collection");
            });
        }
    }).catch(err=>{
        console.log("COUNTER ERROR", err)
    })
}