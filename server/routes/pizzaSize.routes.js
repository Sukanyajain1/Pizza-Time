const PizzaSizeController = require("../controllers/pizzaSize.controller");


// all the routes in a module.exports arrow function
module.exports = (app)=>{
    app.get("/api/hello", PizzaSizeController.sayHello);
    app.get("/api/pizzaSizes", PizzaSizeController.findAllPizzaSizes);
    app.post("/api/pizzaSizes", PizzaSizeController.createPizzaSize);   //create a new pizza size
    app.get("/api/pizzaSizes/random", PizzaSizeController.findRandomPizzaSize);  // find a random pizza size

    /* 
    
    Best Practice: Keep all the static routes on the top and all the dynamic routes with path variables on the bottom so the paths with the same roots and routing syntax don't get confused
            ---> (get route with /api/pizzaSizes/someVariable --> the findRandom and findOne routes conflict with each other)
    
    */

    app.get("/api/pizzaSizes/:id", PizzaSizeController.findOnePizzaSize);
    app.put("/api/pizzaSizes/:id", PizzaSizeController.updatePizzaSize);
    app.delete("/api/pizzaSizes/:id", PizzaSizeController.deletePizzaSize);





}