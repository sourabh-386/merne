const path = require('path')
const mysql = require('mysql2/promise')
const { database } = require('../../Config/ConfigDatabase.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const multer = require('multer')


exports.JobInfoAll = async (req, res) => {

    try {

        const db = await database() //connecting database

        let conn = await db.getConnection(); //transition connected to database

        const query = 'SELECT * FROM Job_info';

        const [data] = await conn.query(query);

        conn.release();

        console.log('working', data)

        res.status(200).send({ 'val': 'sucess', 'data': data });

    } catch (error) {

        console.log(error)
        res.status(400).send({ 'val': 'Failed to load data try again.', 'error': error });

    }


}

exports.JobInfoOne = async (req, res) => {

    try {

        const { id } = req.params
        console.log(id)

        const db = await database() //connecting database

        let conn = await db.getConnection(); //transition connected to database

        const query = `SELECT * FROM Job_info where job_id = '${id}' `;

        const [data] = await conn.query(query);

        conn.release();

        console.log('working', data)

        res.status(200).send({ 'val': 'sucess', 'data': data });

    } catch (error) {

        console.log(error)
        res.status(400).send({ 'val': 'Failed to load data try again.', 'error': error });

    }


}