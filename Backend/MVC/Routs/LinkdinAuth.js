const express = require('express')
const passport = require('passport');
const LinkdinRout = express.Router()
const { database } = require('../../Config/ConfigDatabase.js')
const jwt = require('jsonwebtoken')

LinkdinRout
    .get('/auth/linkedin', passport.authenticate('linkedin'))
    .get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), function (req, res) {
        // Handle successful authentication here
    });

module.exports = LinkdinRout
