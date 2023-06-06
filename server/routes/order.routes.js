const OrderController = require("../controllers/order.controller");


// all the routes in a module.exports arrow function
module.exports = (app)=>{
    app.get("/api/hello", OrderController.sayHello);
    app.get("/api/orders", OrderController.findAllOrders);
    app.post("/api/orders", OrderController.createOrder);
    app.get("/api/orders/random", OrderController.findRandomOrder);  // find a random Order

    /* 
    
    Best Practice: Keep all the static routes on the top and all the dynamic routes with path variables on the bottom so the paths with the same roots and routing syntax don't get confused
            ---> (get route with /api/orders/someVariable --> the findRandom and findOne routes conflict with each other)
    
    */

    app.get("/api/orders/past/:id", OrderController.findAllUserOrders);
    app.get("/api/orders/favorite/:id", OrderController.updateOrderFavorites);
    app.get("/api/orders/:id", OrderController.findOneOrder);
    app.put("/api/orders/:id", OrderController.updateOrder);
    app.delete("/api/orders/:id", OrderController.deleteOrder);





}