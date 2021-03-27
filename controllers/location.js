const locationModel = require('../models/location')
const mongoose = require('mongoose')


module.exports = {
   log: async(req, res) => {
        const {lat, long} = req.body
        let interest = req.user.interest
        console.log(interest)
        const location = new locationModel({
            lat,
            long, 
            interest
        })
        await location.save()

        return res.status(200).json({message: "Logged succesfully!", error: false})
   }
}