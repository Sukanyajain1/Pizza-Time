const DeliveryMethodController = require("../controllers/deliveryMethod.controller");


// all the routes in a module.exports arrow function
module.exports = (app)=>{
    app.get("/api/hello", DeliveryMethodController.sayHello);
    app.get("/api/deliveryMethods", DeliveryMethodController.findAllDeliveryMethods);
    app.post("/api/deliveryMethods", DeliveryMethodController.createDeliveryMethod);   //create a new DeliveryMethod
    app.get("/api/deliveryMethods/random", DeliveryMethodController.findRandomDeliveryMethod);  // find a random DeliveryMethod

    /* 
    
    Best Practice: Keep all the static routes on the top and all the dynamic routes with path variables on the bottom so the paths with the same roots and routing syntax don't get confused
            ---> (get route with /api/deliveryMethods/someVariable --> the findRandom and findOne routes conflict with each other)
    
    */

    app.get("/api/deliveryMethods/:id", DeliveryMethodController.findOneDeliveryMethod);
    app.put("/api/deliveryMethods/:id", DeliveryMethodController.updateDeliveryMethod);
    app.delete("/api/deliveryMethods/:id", DeliveryMethodController.deleteDeliveryMethod);





}