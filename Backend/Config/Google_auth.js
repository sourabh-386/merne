const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { database } = require('./ConfigDatabase.js')
const dotenv = require('dotenv')
dotenv.config()

exports.Google_Strategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_KET,
    callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    passReqToCallback: true
}, async function (req, accessToken, refreshToken, profile, done) {


    const user_detail = profile._json
    let conn;
    const db = await database() //connecting database

    // console.log(user_detail)
    try {
        const user = {
            First_Name: user_detail.given_name,
            Last_Name: user_detail.family_name,
            Email: user_detail.email,
            Picture: user_detail.picture
        }

        console.log('user', user)

        conn = await db.getConnection();
        const find_sql = `Select Email from client_detail where Email=  ?`;
        const [result] = await conn.query(find_sql, user.Email);


        if (result.length > 0) {

            // console.log('user found', user)
            // const user = result[0]; // Extract user information from the result array
            done(null, user);

        }
        else {

            await conn.beginTransaction(); //transition start
            const insert_querry = 'INSERT INTO client_detail (First_Name,Last_Name,Email,Picture) VALUES (?,?,?,?);'
            const user_data = [user.First_Name, user.Last_Name, user.Email, user.Picture]
            const personal_res = await conn.query(insert_querry, user_data); //saving personal data

            await conn.commit();
            conn.release();
            // console.log('user created', user)
            done(null, user); // Indicate failed authentication
        }



    } catch (error) {
        conn.release();
        await conn.close();

        console.log('catch_error', error)

        done(error, null)

    }


})