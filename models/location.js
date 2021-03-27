const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const locationSchema = new Schema({

  lat: {
    type: Number,
    required: true,
  },

  long: {
    type: Number,
    required: true,
  },

  interest: {
    type: Array,
    require: true,
  }
})

const locationModel = mongoose.model('location', locationSchema)
module.exports = locationModel
