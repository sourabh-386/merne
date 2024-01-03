const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { path } = require('path')

const UserRout = require('./MVC/Routs/UserRout')
const PrivateRoute = require('./MVC/Routs/PrivateRoutes.js')
const GoogleRout = require('./MVC/Routs/GoogleAuth.js')
const LinkdinRout = require('./MVC/Routs/LinkdinAuth.js')
const JobPrivateRoute = require('./MVC/Routs/JobRoutPrivate.js')
const { path } = require('path')

const { AuthMiddleware } = require('./Middleware/Auth_middleware.js')

const dotenv = require('dotenv')
dotenv.config()

const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Google_Strategy } = require('./Config/Google_auth.js')
const { Linkdin_strategy } = require('./Config/Linkdin_auth.js')

const app = express()

app.use(cors({ origin: process.env.BASE_URL_FRONTEND, credentials: true }))




//JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use express-session middleware
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));


app.use(passport.initialize());
app.use(passport.session());

//google, linkdin auth/////////////////////////////////////////////////
passport.use(Google_Strategy);
passport.use(Linkdin_strategy);


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, { user: user });
});





//LOAD ROUTS
app.use('/user', UserRout)

app.use('/auth', GoogleRout)

app.use('/linkdin', LinkdinRout)

app.use('/jobs', JobPrivateRoute)

app.use('/athenticatedUsers', AuthMiddleware, PrivateRoute)

app.get('*', (req, res, next) => {
    res.status(200).json({
        message: 'working at root rout'
    })
})



app.listen(process.env.PORT || 3009, () => {
    console.log("Server is working")
})
