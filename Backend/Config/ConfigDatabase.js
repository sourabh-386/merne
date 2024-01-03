const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
dotenv.config()

exports.database = async () => {

    try {


        const db = mysql.createPool({
            connectionLimit: 100,
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        })

        return db

    } catch (error) {
        console.log(error)
    }

}

