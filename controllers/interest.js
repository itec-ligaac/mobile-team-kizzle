const interestModel = require('../models/interest')
const mongoose = require('mongoose')

module.exports = {
    getInterest: async(req, res) => {
        let interests = []
        for (let index = 0; index < req.body.interest.length; index++) {
            let uid = req.body.interest[index]
            await interestModel.findOne({uid}, async function(err, obj) {
                await interests.push(obj)
            })
        }
        return res.status(200).json({message: interests, error: false})
    },
    //internal API
    addInterest: async(req, res) => {
        const { uid, name, image } = req.body
        const interest = new interestModel({
            uid, 
            name,
            image
        })
        await interest.save()
        return res.status(200).json({message: "Interest saved!", error: false})
    },
    getAll: async(req, res) => {
        interestModel.find({}, function(err, obj) {
            
        })
    }
}