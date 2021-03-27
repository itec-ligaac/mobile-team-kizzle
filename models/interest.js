const mongoose = require('mongoose')
const Schema = mongoose.Schema

const interestSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    require: true,
  }
})

const interestModel = mongoose.model('interest', interestSchema)
module.exports = interestModel
