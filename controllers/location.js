const locationModel = require('../models/location')
const mongoose = require('mongoose')
const axios = require('axios')
const {
	HERE_maps_bearer_key
} = require('../config')
module.exports = {
	log: async (req, res) => {
		const {
			lat,
			long
		} = req.body
		var city = ""
		await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${long}&lang=en-USd`, {
			headers: {
				Authorization: "Bearer " + HERE_maps_bearer_key,
			},
		}).then((response) => {
			city = response.data.items[0].address.city
            console.log(city)
		})
		if (city != req.user.city) {
			return res.status(200).json({
				message: "Cities do not match!",
				error: true
			})
		}
		let interest = req.user.interest
		const location = new locationModel({
			lat,
			long,
			interest,
			city
		})
		await location.save()
		return res.status(200).json({
			message: "Logged succesfully!",
			error: false
		})
	},
	map: async (req, res) => {
		const {
			interest,
			lat,
			long
		} = req.body
		var city = ""
		await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${long}&lang=en-USd`, {
			headers: {
				Authorization: "Bearer " + HERE_maps_bearer_key,
			},
		}).then((response) => {
			city = response.data.items[0].address.city
		})
		locationModel.find({
			city,
			interest,
		}, function(err, obj) {
            return res.status(200).json({message: obj, error: false})
        })
	}
}