const express = require('express')
const route = express.Router()
const register = require('./register')
const store = require('./store')
const product = require('./product')
const session = require('express-session')
const Controller = require('../controller/RegisterController')

route.use(session({
    secret: 'Hayooo',
    resave: false,
    saveUninitialized: false,
    cookie:{
      secure:false,
      sameSite:true,
    }
}))

route.use(register)

route.post("/login", Controller.postLogin)
route.get("/logout", Controller.getlogout)


route.use(function(req, res, next) {
    console.log(req.session);
    if(!req.session.userId){
        const error = "Please Login"
        res.redirect(`/?err=${error}`)
    }else{
        next()
    }
})

route.get("/", register)
route.use(store)
route.use(product)

module.exports = route