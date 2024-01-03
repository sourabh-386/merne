const express = require('express')
const GoogleRout = express.Router()
const { database } = require('../../Config/ConfigDatabase.js')
const { featching_all } = require('../../Helper_fn/Featching_data.js')
const jwt = require('jsonwebtoken')
const { user_signin, user_login, Forgot_password, Reset_password } = require('../Controllers/UserController')
const passport = require('passport');
const { error } = require('firebase-functions/logger')
const dotenv = require('dotenv')
dotenv.config()

GoogleRout
    .get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
    .get('/google/callback',
        passport.authenticate('google', { failureRedirect: process.env.BASE_URL_FRONTEND, failureMessage: 'error with callback' }),
        function (req, res) {

            res.redirect(`${process.env.BASE_URL_FRONTEND}/Login/Sucessfull`);

        })
    .get('/user', async (req, res) => {

        try {
            console.log(req.user)
            if (req.user) {
                const db = await database() //connecting database
                conn = await db.getConnection(); //transition connected to database


                console.log('req.user',req.user)
                const user = req.user.user
                console.log('user', user)


                const User_id = `${user.First_Name.toLowerCase()}${user.Email.toLowerCase().split('@')[0]}`; //genrating user id

                const jwtToken = jwt.sign({ user_email: user.Email, user_id: User_id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' }) //GENRATING JWT TOKEN


                //checking genraldetails filled or npt
                const check_user_data = 'SELECT COUNT(*) AS count FROM client_genral_info WHERE User_id = ?';
                const [rows] = await conn.query(check_user_data, User_id);
                const recordExists = rows[0].count > 0;

                //checking personaldetails filled or npt
                const check_user_data2 = 'SELECT COUNT(*) AS count FROM Personal_info WHERE User_id = ?';
                const [rows2] = await conn.query(check_user_data2, User_id);
                const recordExists2 = rows2[0].count > 0;


                const data = await featching_all(conn, User_id)


                conn.release();

                if (recordExists && recordExists2) {
                    res.status(200).send({ 'val': 'Login Successfull', 'token': jwtToken, 'Data1': true, 'Data2': true, 'output': data,User_id:User_id })
                }
                else if (recordExists) {
                    res.status(200).send({ 'val': 'Login Successfull', 'token': jwtToken, 'Data1': true, 'Data2': false, 'output': data,User_id:User_id })
                }
                else if (recordExists2) {
                    res.status(200).send({ 'val': 'Login Successfull', 'token': jwtToken, 'Data2': true, 'Data1': false, 'output': data,User_id:User_id })
                }
                else {
                    res.status(200).send({ 'val': 'Login Successfull', 'token': jwtToken, 'Data1': false, 'Data2': false, 'output': data,User_id:User_id })
                }

            }
            else {
                console.log('error ma',)
                res.status(404).send({ 'val': 'Something Went wrong' })

            }

        }
        catch (error) {
            await conn.release();
            console.log(error)
            res.status(404).send({ 'val': 'Something Went wrong' })

        }

    })




module.exports = GoogleRout