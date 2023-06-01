const Sauce = require("../models/sauce.model");

// all the callback functions for db parsing will be here for only the Sauce model

module.exports.sayHello = (req, res)=>{
    res.json({msg: "Hello to all the Sauces in the houseeeeeeeee!"})
}


module.exports.findAllSauces = (req, res) =>{
    Sauce.find()
        .then(allSauces=>{
            res.json({results: allSauces})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the Sauce controller: ", error: err})
        })
}

module.exports.createSauce = (req, res)=>{
    // req.body represents the form information
    Sauce.create(req.body)
        .then(newCreatedSauce => {
            res.json({results: newCreatedSauce})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the Sauce controller: ", error: err})
        })
}

module.exports.findOneSauce = (req, res)=>{
    // req.body represents the form information
    Sauce.findOne({_id: req.params.id})
        .then(foundSauce => {
            res.json({results: foundSauce})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the Sauce controller: ", error: err})
        })
}

module.exports.updateSauce = (req, res)=>{
    // req.body represents the form information
    Sauce.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updateSauce => {
            res.json({results: updateSauce})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the Sauce controller: ", error: err})
        })
}

module.exports.deleteSauce = (req, res)=>{
    // req.body represents the form information
    Sauce.deleteOne({_id: req.params.id})
        .then(deletedSauce => {
            res.json({results: deletedSauce})
        })
        .catch(err=> {
            res.json({msg: "Something went wrong in the Sauce controller: ", error: err})
        })
}

module.exports.findRandomSauce = (req, res) =>{
    Sauce.find()
        .then(allSauces=>{
            // get a random index number from index 0 up to but not including the allSauces.length
            let randomIdx = Math.floor(Math.random()*allSauces.length)

            res.json({results: allSauces[randomIdx]})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong in the Sauce controller: ", error: err})
        })
}