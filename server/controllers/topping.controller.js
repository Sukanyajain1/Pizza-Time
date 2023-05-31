const Topping = require("../models/topping.model");

// all the callback functions for db parsing will be here for only the Topping model

module.exports.sayHello = (req, res)=>{
    res.json({msg: "Hello to all the Toppings in the houseeeeeeeee!"})
}


module.exports.findAllToppings = (req, res) =>{
    Topping.find()
        .then(allToppings=>{
            res.json({results: allToppings})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the Topping controller: ", error: err})
        })
}

module.exports.createTopping = (req, res)=>{
    // req.body represents the form information
    Topping.create(req.body)
        .then(newCreatedTopping => {
            res.json({results: newCreatedTopping})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the Topping controller: ", error: err})
        })
}

module.exports.findOneTopping = (req, res)=>{
    // req.body represents the form information
    Topping.findOne({_id: req.params.id})
        .then(foundTopping => {
            res.json({results: foundTopping})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the Topping controller: ", error: err})
        })
}

module.exports.updateTopping = (req, res)=>{
    // req.body represents the form information
    Topping.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updateTopping => {
            res.json({results: updateTopping})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the Topping controller: ", error: err})
        })
}

module.exports.deleteTopping = (req, res)=>{
    // req.body represents the form information
    Topping.deleteOne({_id: req.params.id})
        .then(deletedTopping => {
            res.json({results: deletedTopping})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the Topping controller: ", error: err})
        })
}

module.exports.findRandomTopping = (req, res) =>{
    Topping.find()
        .then(allToppings=>{
            // get a random index number from index 0 up to but not including the allToppings.length
            let randomIdx = Math.floor(Math.random()*allToppings.length)

            res.json({results: allToppings[randomIdx]})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the Topping controller: ", error: err})
        })
}