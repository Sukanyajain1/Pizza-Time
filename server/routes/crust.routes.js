const CrustController = require("../controllers/crust.controller");


// all the routes in a module.exports arrow function
module.exports = (app)=>{
    app.get("/api/hello", CrustController.sayHello);
    app.get("/api/crusts", CrustController.findAllCrusts);
    app.post("/api/crusts", CrustController.createCrust);   //create a new Crust
    app.get("/api/crusts/random", CrustController.findRandomCrust);  // find a random Crust

    /* 
    
    Best Practice: Keep all the static routes on the top and all the dynamic routes with path variables on the bottom so the paths with the same roots and routing syntax don't get confused
            ---> (get route with /api/crusts/someVariable --> the findRandom and findOne routes conflict with each other)
    
    */

    app.get("/api/crusts/:id", CrustController.findOneCrust);
    app.put("/api/crusts/:id", CrustController.updateCrust);
    app.delete("/api/crusts/:id", CrustController.deleteCrust);





}