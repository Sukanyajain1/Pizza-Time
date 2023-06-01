const SauceController = require("../controllers/sauce.controller");


// all the routes in a module.exports arrow function
module.exports = (app)=>{
    app.get("/api/hello", SauceController.sayHello);
    app.get("/api/sauces", SauceController.findAllSauces);
    app.post("/api/sauces", SauceController.createSauce);   //create a new Sauce
    app.get("/api/sauces/random", SauceController.findRandomSauce);  // find a random Sauce

    /* 
    
    Best Practice: Keep all the static routes on the top and all the dynamic routes with path variables on the bottom so the paths with the same roots and routing syntax don't get confused
            ---> (get route with /api/sauces/someVariable --> the findRandom and findOne routes conflict with each other)
    
    */

    app.get("/api/sauces/:id", SauceController.findOneSauce);
    app.put("/api/sauces/:id", SauceController.updateSauce);
    app.delete("/api/sauces/:id", SauceController.deleteSauce);





}