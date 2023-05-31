const PizzaSize = require("../models/pizzaSize.model");

// all the callback functions for db parsing will be here for only the PizzaSize model

module.exports.sayHello = (req, res)=>{
    res.json({msg: "Hello to all the PizzaSizes in the houseeeeeeeee!"})
}


module.exports.findAllPizzaSizes = (req, res) =>{
    PizzaSize.find()
        .then(allPizzaSizes=>{
            res.json({results: allPizzaSizes})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the PizzaSize controller: ", error: err})
        })
}

module.exports.createPizzaSize = (req, res)=>{
    // req.body represents the form information
    PizzaSize.create(req.body)
        .then(newCreatedPizzaSize => {
            res.json({results: newCreatedPizzaSize})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the PizzaSize controller: ", error: err})
        })
}

module.exports.findOnePizzaSize = (req, res)=>{
    // req.body represents the form information
    PizzaSize.findOne({_id: req.params.id})
        .then(foundPizzaSize => {
            res.json({results: foundPizzaSize})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the PizzaSize controller: ", error: err})
        })
}

module.exports.updatePizzaSize = (req, res)=>{
    // req.body represents the form information
    PizzaSize.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updatePizzaSize => {
            res.json({results: updatePizzaSize})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the PizzaSize controller: ", error: err})
        })
}

module.exports.deletePizzaSize = (req, res)=>{
    // req.body represents the form information
    PizzaSize.deleteOne({_id: req.params.id})
        .then(deletedPizzaSize => {
            res.json({results: deletedPizzaSize})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the PizzaSize controller: ", error: err})
        })
}

module.exports.findRandomPizzaSize = (req, res) =>{
    PizzaSize.find()
        .then(allPizzaSizes=>{
            // get a random index number from index 0 up to but not including the allPizzaSizes.length
            let randomIdx = Math.floor(Math.random()*allPizzaSizes.length)

            res.json({results: allPizzaSizes[randomIdx]})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the PizzaSize controller: ", error: err})
        })
}