const mongoose = require("mongoose");

// purpose of this file is to describe how our products table (collection) should look

const DeliveryMethodSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    }
}, {timestamps:true})


const DeliveryMethod = mongoose.model("DeliveryMethod", DeliveryMethodSchema);

module.exports = DeliveryMethod;


// initial() function helps us to create important rows in delivery method collection.
module.exports.initial=()=>{
    DeliveryMethod.find({}).then((docs)=>{
        // console.log(docs, "this is docs");
        console.log(docs.length, "this is number of delivery methods");
        if (docs.length === 0) {
            new DeliveryMethod({
                name: "Carry Out",
                price: 0
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Carry Out' to delivery method collection");
            });

            new DeliveryMethod({
                name: "Home Delivery",
                price: 8.20
            }).save({}).then(res => {
                if (res) {
                    console.log("This is the new addition: ", res);
                }
                console.log("added 'Home Delivery' to delivery method collection");
            });
        }
    }).catch(err=>{
        console.log("COUNTER ERROR", err)
    })
}