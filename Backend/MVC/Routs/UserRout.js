const express = require('express')
const UserRout = express.Router()
const { user_signin, user_login, Forgot_password, Reset_password } = require('../Controllers/UserController')

UserRout
    .post('/Signin', user_signin)
    .post('/Login', user_login)
    .post('/forgotPassword', Forgot_password)
    .post('/reset/:email/:token', Reset_password)




module.exports = UserRout