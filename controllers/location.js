const locationModel = require('../models/location')
const mongoose = require('mongoose')


module.exports = {
   log: async(req, res) => {
        const {lat, long, city} = req.body
        if(city != req.user.city) {
            return res.status(200).json({message: "Cities do not match!", error: true})
        }
        let interest = req.user.interest
        const location = new locationModel({
            lat,
            long, 
            interest,
            city
        })
        await location.save()

        return res.status(200).json({message: "Logged succesfully!", error: false})
   }
}