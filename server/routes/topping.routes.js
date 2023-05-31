const ToppingController = require("../controllers/topping.controller");


// all the routes in a module.exports arrow function
module.exports = (app)=>{
    app.get("/api/hello", ToppingController.sayHello);
    app.get("/api/toppings", ToppingController.findAllToppings);
    app.post("/api/toppings", ToppingController.createTopping);   //create a new topping
    app.get("/api/toppings/random", ToppingController.findRandomTopping);  // find a random topping

    /* 
    
    Best Practice: Keep all the static routes on the top and all the dynamic routes with path variables on the bottom so the paths with the same roots and routing syntax don't get confused
            ---> (get route with /api/toppings/someVariable --> the findRandom and findOne routes conflict with each other)
    
    */

    app.get("/api/toppings/:id", ToppingController.findOneTopping);
    app.put("/api/toppings/:id", ToppingController.updateTopping);
    app.delete("/api/toppings/:id", ToppingController.deleteTopping);





}