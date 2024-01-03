var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const { database } = require('./ConfigDatabase.js')

exports.Linkdin_strategy=new LinkedInStrategy({
    clientID: process.env.LINKDIN_CLIENT_ID,
    clientSecret: process.env.LINKDIN_KEY,
    callbackURL: `${process.env.BASE_URL}/linkdin/auth/linkedin/callback`,
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, function(accessToken, refreshToken, profile, done) {

    console.log(profile)

    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's LinkedIn profile is returned to
      console.log(profile)
      // represent the logged-in user. In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  });