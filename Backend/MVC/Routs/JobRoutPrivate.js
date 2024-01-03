const express = require('express')
const JobPrivateRoute = express.Router()
const { JobInfoAll, JobInfoOne } = require('../Controllers/JobControllersPrivate.js')


JobPrivateRoute
    .get('/jobdata', JobInfoAll)
    .get('/jobdata/:id', JobInfoOne)


module.exports = JobPrivateRoute