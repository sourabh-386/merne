const { database } = require('../../../Config/ConfigDatabase.js')
const dotenv = require('dotenv')
dotenv.config()

// signup function 
exports.save_skill = async (req, res) => {

    const db = await database() //connecting database

    conn = await db.getConnection(); //transition connected to database

    const user_id = req.User_id

    const skill = req.body

    const skill_new = skill.join()


    try {

        const querry = 'SELECT COUNT(*) as count FROM Skills_links WHERE User_id = ?;'
        const [count] = await conn.query(querry,user_id);

        await conn.beginTransaction(); //transition start

        if (count[0].count == 0) {

            const job_query = 'INSERT INTO Skills_links ( User_id,Skills) VALUES (?, ?);';

            const values = [user_id, skill_new];

            await conn.query(job_query, values);


            await conn.commit();
            conn.release();
            res.status(200).send({ 'val': 'Data saved' })
        }
        else {

            const updateRowQuery = 'UPDATE Skills_links SET Skills = ? WHERE User_id = ? ';

            const value = [skill_new,user_id]

            await conn.query(updateRowQuery, value);

            await conn.commit();
            conn.release();
            res.status(200).send({ 'val': 'Updated' })
        }



    } catch (error) {
        console.log(error)
        await conn.rollback();
        conn.release();
        res.status(400).send({ 'val': 'Something went wrong try again' })
    }

}



// ------------------------------------------------------ 

