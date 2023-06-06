const Order = require("../models/order.model");

// all the callback functions for db parsing will be here for only the Order model

module.exports.sayHello = (req, res)=>{
    res.json({msg: "Hello to all the Orders in the houseeeeeeeee!"})
}


module.exports.findAllOrders = (req, res) =>{
    Order.find()
        .then(allOrders=>{
            res.json({results: allOrders})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the order controller: ", error: err})
        })
}

module.exports.findAllUserOrders = (req, res) =>{
    Order.find()
    .where('user_id').equals(req.params.id)
    .populate("pizza_id")
        .then(allOrders=>{
            res.json({results: allOrders})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the order controller: ", error: err})
        })
}

module.exports.createOrder = (req, res)=>{
    // req.body represents the form information
    Order.create(req.body)
        .then(newCreatedOrder => {
            res.json({results: newCreatedOrder})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the order controller: ", error: err})
        })
}

module.exports.findOneOrder = (req, res)=>{
    // req.body represents the form information
    Order.findOne({_id: req.params.id})
        .then(foundOrder => {
            res.json({results: foundOrder})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the order controller: ", error: err})
        })
}

module.exports.updateOrderFavorites = (req, res)=>{
    // req.body represents the form information
    Order.findOneAndUpdate(
        {_id: req.params.id},
        {isFavorite: !isFavorite},
        {new: true, runValidators: true}
    )
        .then(updateOrder => {
            res.json({results: updateOrder})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the order controller: ", error: err})
        })
}

module.exports.updateOrder = (req, res)=>{
    // req.body represents the form information
    Order.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updateOrder => {
            res.json({results: updateOrder})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the order controller: ", error: err})
        })
}

module.exports.deleteOrder = (req, res)=>{
    // req.body represents the form information
    Order.deleteOne({_id: req.params.id})
        .then(deletedOrder => {
            res.json({results: deletedOrder})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the order controller: ", error: err})
        })
}

module.exports.findRandomOrder = (req, res) =>{
    Order.find()
        .then(allOrders=>{
            // get a random index number from index 0 up to but not including the allOrders.length
            let randomIdx = Math.floor(Math.random()*allOrders.length)

            res.json({results: allOrders[randomIdx]})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the order controller: ", error: err})
        })
}