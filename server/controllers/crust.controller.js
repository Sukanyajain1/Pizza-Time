const Crust = require("../models/crust.model");

// all the callback functions for db parsing will be here for only the Crust model

module.exports.sayHello = (req, res)=>{
    res.json({msg: "Hello to all the Crusts in the houseeeeeeeee!"})
}


module.exports.findAllCrusts = (req, res) =>{
    Crust.find()
        .then(allCrusts=>{
            res.json({results: allCrusts})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the Crust controller: ", error: err})
        })
}

module.exports.createCrust = (req, res)=>{
    // req.body represents the form information
    Crust.create(req.body)
        .then(newCreatedCrust => {
            res.json({results: newCreatedCrust})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the Crust controller: ", error: err})
        })
}

module.exports.findOneCrust = (req, res)=>{
    // req.body represents the form information
    Crust.findOne({_id: req.params.id})
        .then(foundCrust => {
            res.json({results: foundCrust})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the Crust controller: ", error: err})
        })
}

module.exports.updateCrust = (req, res)=>{
    // req.body represents the form information
    Crust.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updateCrust => {
            res.json({results: updateCrust})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the Crust controller: ", error: err})
        })
}

module.exports.deleteCrust = (req, res)=>{
    // req.body represents the form information
    Crust.deleteOne({_id: req.params.id})
        .then(deletedCrust => {
            res.json({results: deletedCrust})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the Crust controller: ", error: err})
        })
}

module.exports.findRandomCrust = (req, res) =>{
    Crust.find()
        .then(allCrusts=>{
            // get a random index number from index 0 up to but not including the allCrusts.length
            let randomIdx = Math.floor(Math.random()*allCrusts.length)

            res.json({results: allCrusts[randomIdx]})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the Crust controller: ", error: err})
        })
}