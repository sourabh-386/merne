const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const { database } = require('../Config/ConfigDatabase.js')


exports.AuthMiddleware = async (req, res, next) => {

    const {authorization} = req.headers

    // console.log(authorization)
    if (authorization && authorization.startsWith('Bearer')) {
        try {

            const token = authorization.split(' ')[1] //splitting token from frontend header

            const { user_email } = jwt.verify(token, process.env.JWT_SECRET_KEY) //getting email from token

            const db = await database() //connecting database

            const sql = `Select Email,User_id from client_detail where Email=  ?`;
            const [result] = await db.query(sql, [user_email]);


            if (result && result.length > 0) {
                req.Email = result[0].Email; // Storing the email in the request object
                req.User_id = result[0].User_id; // Storing the email in the request object

                next();
            } else {
                res.status(401).send({ 'val': 'Unauthorized1' });
            }

        } catch (error) {
            console.log(error.message)
            res.status(401).send({ 'val': 'Unauthorized2' });

        }
    } else {
        res.status(401).send({ 'val': 'UnAuthorized3' });

    }

}