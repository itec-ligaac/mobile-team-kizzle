//dependences
const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')
const { mongoPath, mongoDatabase } = require('./config')
const authController = require('./controllers/auth')
const userController = require('./controllers/user')
const locationController = require('./controllers/location')
const interestController = require('./controllers/interest')

const localConfig = require('./passportConfig/passport-local')
const jwtConfig = require('./passportConfig/passport-jwt')

mongoose.Promise = global.Promise
console.log(`${mongoPath}/${mongoDatabase}`)
mongoose.connect(`${mongoPath}/${mongoDatabase}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false,
}, function(err) {
    if(err) {
        console.log("err" + err)
    } else {
        console.log("it works.")
    }
})

const app = express()

//initialize passport and parse incoming data as JSON
app.use(express.urlencoded({
    extended: true
}))
app.use(cors({origin: 'http://localhost', credentials: true}))
app.use(passport.initialize())
app.use(express.json())

const localValidator = passport.authenticate('local', {
    session: false,
})
const tokenValidator = passport.authenticate('jwt', {
    session: false,
})

app.post('/api/auth/register', authController.register)
app.post('/api/auth/login', localValidator, authController.login)

app.get('/api/user/me', tokenValidator, userController.me)

app.post('/api/location/log', tokenValidator, locationController.log)
app.post('/api/location/all', tokenValidator, locationController.map)

app.post('/api/interest/get', tokenValidator, interestController.getInterest)
app.post('/api/interest/add', tokenValidator, interestController.addInterest)
app.get('/api/interest/all', tokenValidator, interestController.getAll)

app.post('/api/misc/autocomplete', tokenValidator, locationController.autocomplete)
module.exports = app