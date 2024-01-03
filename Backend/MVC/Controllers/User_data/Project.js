const { database } = require('../../../Config/ConfigDatabase.js')
const dotenv = require('dotenv')
dotenv.config()

// signup function 
exports.save_project = async (req, res) => {

    const db = await database() //connecting database

    let conn = await db.getConnection(); //transition connected to database

    const user_id = req.User_id

    const project = req.body

    const Project_name = project.Project_name.trim()
    const Start_Date = project.Start_Date
    const End_Date = project.End_Date?project.End_Date:null
    const Ongoing = project.Ongoing?"True":'False'
    const Description = project.Description.trim()
    const Project_link = project.Project_link.trim()
    const id = project.id



    try {

        const querry = 'SELECT COUNT(*) as count FROM Project WHERE User_id = ? AND id = ?;'
        const [count] = await conn.query(querry, [user_id, id]);

        await conn.beginTransaction(); //transition start

        if (count[0].count == 0) {

            const query = 'INSERT INTO Project (User_id, Project_name, Start_Date, End_Date, Ongoing, Description, Project_link,id) VALUES (?, ?, ?, ?, ?, ?, ?,?);';

            const values = [ user_id,Project_name, Start_Date, End_Date, Ongoing, Description, Project_link, id];

            await conn.query(query, values);


            await conn.commit();
            conn.release();
            res.status(200).send({ 'val': 'Data saved' })
        }
        else {

            const updateRowQuery = 'UPDATE Project SET Project_name = ?, Start_Date = ?,End_Date = ?, Ongoing = ?,Description = ?, Project_link = ? WHERE User_id = ? and id = ?';

            const values = [Project_name, Start_Date, End_Date, Ongoing, Description, Project_link, user_id, id]

            await conn.query(updateRowQuery, values);

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

// delete_job
exports.delete_project = async (req, res) => {

    const db = await database() //connecting database

    conn = await db.getConnection(); //transition connected to database

    const user_id = req.User_id

    const { id } = req.params;

    const deleteRowQuery = 'DELETE FROM Project WHERE User_id = ? AND id = ?';

    const values = [user_id, id];

    console.log(values)

    try {
        await conn.beginTransaction(); //transition start
        await conn.query(deleteRowQuery, values);
        await conn.commit();
        conn.release();
        res.status(200).send({ 'val': 'Deleted' })

    }
    catch (error) {
        await conn.rollback();
        conn.release();
        console.log(error)
        res.status(400).send({ 'val': 'Something went wrong' })


    }


}