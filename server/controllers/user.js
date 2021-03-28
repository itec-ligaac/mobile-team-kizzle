const userModel = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const JWT = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
module.exports = {
    me: async(req, res) => {
        return res.status(200).json({
            error: false,
            data: req.user
        })
    }
}