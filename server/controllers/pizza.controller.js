const Pizza = require("../models/pizza.model");

// all the callback functions for db parsing will be here for only the Pizza model

module.exports.sayHello = (req, res)=>{
    res.json({msg: "Hello to all the Pizzas in the houseeeeeeeee!"})
}


module.exports.findAllPizzas = (req, res) =>{
    Pizza.find()
    .populate("crust", ["_id", "name", "price"])
    .populate("pizzaSize", ["_id", "name", "price"])
    .populate("sauce", ["_id", "name", "price"])
    .populate("toppings", ["_id", "name", "price"])
        .then(allPizzas=>{
            res.json({results: allPizzas})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the pizza controller: ", error: err})
        })
}

module.exports.createPizza = (req, res)=>{
    // req.body represents the form information
    Pizza.create(req.body)
        .then(newCreatedPizza => {
            res.json({results: newCreatedPizza})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the pizza controller create function: ", error: err})
        })
}

module.exports.findOnePizza = (req, res)=>{
    // req.body represents the form information
    Pizza.findById({_id: req.params.id})
    // .populate("crust", ["_id", "name", "price"])
    // .populate("pizzaSize", ["_id", "name", "price"])
    // .populate("sauce", ["_id", "name", "price"])
    // .populate("toppings", ["_id", "name", "price"])
    // .populate("user_id")
        .then(foundPizza => {
            res.json({results: foundPizza})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the pizza controller: ", error: err})
        })
}


module.exports.findPendingPizzas = (req, res)=>{
    // req.body represents the form information
    Pizza.find()
    .where('orderStatus').equals("pending")
    .where('user_id').equals(req.params.id)
    .populate("user_id", ["_id", "firstName", "lastName"])
        .then(allPizzasInCart => {
            res.json({results: allPizzasInCart})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the pizza controller: ", error: err})
        })
}

module.exports.updatePizza = (req, res)=>{
    // req.body represents the form information
    Pizza.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updatePizza => {
            res.json({results: updatePizza})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the pizza controller: ", error: err})
        })
}

module.exports.updatePizzaStatus = (req, res)=>{
    // req.body represents the form information
    Pizza.findOneAndUpdate(
        {_id: req.params.id},
        {orderStatus: "submitted"},
        {new: true, runValidators: true}
    )
        .then(updatePizza => {
            res.json({results: updatePizza})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the pizza controller: ", error: err})
        })
}

module.exports.deletePizza = (req, res)=>{
    // req.body represents the form information
    Pizza.deleteOne({_id: req.params.id})
        .then(deletedPizza => {
            res.json({results: deletedPizza})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the pizza controller: ", error: err})
        })
}

module.exports.findRandomPizza = (req, res) =>{
    Pizza.find()
    .populate("crust")
    .populate("size")
    .populate("sauce")
    .populate("toppings")
        .then(allPizzas=>{
            // get a random index number from index 0 up to but not including the allPizzas.length
            let randomIdx = Math.floor(Math.random()*allPizzas.length)

            res.json({results: allPizzas[randomIdx]})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the pizza controller: ", error: err})
        })
}