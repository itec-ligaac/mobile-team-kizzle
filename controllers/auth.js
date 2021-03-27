const userModel = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const JWT = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
module.exports = {
    register: async(req, res) => {
        const { name, password, email, interest, city } = req.body
        const uid = uuid.v4() 
        const userRegistered = await userModel.findOne({email})
        console.log(userRegistered)
        if(userRegistered) {
            return res.status(200).json({message: "User already exist!", error: true})
        }

        const user = new userModel({
            name, 
            password, 
            email, 
            uid, 
            interest,
            city,
        })
        await user.save()

        const token = JWT.sign({
            iss: "Ardency!",
            sub: user.uid,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1),
        }, JWT_SECRET)

        return res.status(200).json({token: token, error: false})

    },
    login: async(req, res) => {
        if (!req.user || Object.keys(req.user).length === 0) {
            return res.status(200).json({ message: 'Invalid username or password.', error: true })
        }
          const token = JWT.sign({
            iss: "Ardency!",
            sub: req.user.uid,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1),
        }, JWT_SECRET)
          return res
            .status(200)
            .json({ token, error: false })
    }

}