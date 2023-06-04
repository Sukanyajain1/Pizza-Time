const DeliveryMethod = require("../models/deliveryMethod.model");

// all the callback functions for db parsing will be here for only the DeliveryMethod model

module.exports.sayHello = (req, res)=>{
    res.json({msg: "Hello to all the DeliveryMethods in the houseeeeeeeee!"})
}


module.exports.findAllDeliveryMethods = (req, res) =>{
    DeliveryMethod.find()
        .then(allDeliveryMethods=>{
            res.json({results: allDeliveryMethods})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the DeliveryMethod controller: ", error: err})
        })
}

module.exports.createDeliveryMethod = (req, res)=>{
    // req.body represents the form information
    DeliveryMethod.create(req.body)
        .then(newCreatedDeliveryMethod => {
            res.json({results: newCreatedDeliveryMethod})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the DeliveryMethod controller: ", error: err})
        })
}

module.exports.findOneDeliveryMethod = (req, res)=>{
    // req.body represents the form information
    DeliveryMethod.findOne({_id: req.params.id})
        .then(foundDeliveryMethod => {
            res.json({results: foundDeliveryMethod})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the DeliveryMethod controller: ", error: err})
        })
}

module.exports.updateDeliveryMethod = (req, res)=>{
    // req.body represents the form information
    DeliveryMethod.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updateDeliveryMethod => {
            res.json({results: updateDeliveryMethod})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the DeliveryMethod controller: ", error: err})
        })
}

module.exports.deleteDeliveryMethod = (req, res)=>{
    // req.body represents the form information
    DeliveryMethod.deleteOne({_id: req.params.id})
        .then(deletedDeliveryMethod => {
            res.json({results: deletedDeliveryMethod})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the DeliveryMethod controller: ", error: err})
        })
}

module.exports.findRandomDeliveryMethod = (req, res) =>{
    DeliveryMethod.find()
        .then(allDeliveryMethods=>{
            // get a random index number from index 0 up to but not including the allDeliveryMethods.length
            let randomIdx = Math.floor(Math.random()*allDeliveryMethods.length)

            res.json({results: allDeliveryMethods[randomIdx]})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the DeliveryMethod controller: ", error: err})
        })
}