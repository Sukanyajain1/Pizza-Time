const db_name = "pizza_time_schema";
const db = require("../models/index");
const sauces = db.sauce;
const toppings = db.topping;
const pizzaSizes = db.pizzaSize;
const crusts = db.crust;
const deliveryMethods = db.deliveryMethod;


// mongoose connection here
db.mongoose.connect(`mongodb+srv://root:root@clustermay.nvakqpq.mongodb.net/${db_name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log("Established a connection to the database");
        sauces.initial();
        toppings.initial();
        pizzaSizes.initial();
        crusts.initial();
        deliveryMethods.initial();
        console.log("checked initial() and printed docs to console");
    })
    .catch( err=>
        console.log("Something went wrong when connecting to the database", err)
        );
        

