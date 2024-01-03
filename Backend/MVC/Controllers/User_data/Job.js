const { database } = require('../../../Config/ConfigDatabase.js')
const dotenv = require('dotenv')
dotenv.config()

// signup function 
exports.save_job = async (req, res) => {

    const db = await database() //connecting database

    conn = await db.getConnection(); //transition connected to database

    const user_id = req.User_id

    const Job_details = req.body

    const Job_title = Job_details.Job_title
    const Job_type = Job_details.Job_type
    const Designation = Job_details.Designation.trim()
    const Profile = Job_details.Profile.trim()
    const Organisation = Job_details.Organisation.trim()
    const Location = Job_details.Location.trim()
    const Start_Date = Job_details.Start_Date
    const End_Date = Job_details.End_Date?Job_details.End_Date:null
    const Currently_Working = Job_details.Currently_Working?'True':"False"
    const Role_Description = Job_details.Role_Description.trim()
    const key = Job_details.key


    try {

        const querry = 'SELECT COUNT(*) as count FROM work_experience WHERE User_id = ? AND id = ?;'
        const [count] = await conn.query(querry, [user_id, key]);

        await conn.beginTransaction(); //transition start

        if (count[0].count == 0) {

            const job_query = 'INSERT INTO work_experience (User_id, Job_title, Job_type, Designation, Profile, Organisation,Location, Start_Date, End_Date, Currently_Working, Role_Description, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?);';

            const values = [user_id, Job_title, Job_type, Designation, Profile, Organisation, Location, Start_Date, End_Date, Currently_Working, Role_Description, key];

            const [job_res] = await conn.query(job_query, values);


            await conn.commit();
            conn.release();
            res.status(200).send({ 'val': 'Data saved' })
        }
        else {

            const updateRowQuery = 'UPDATE work_experience SET Job_title = ?, Job_type = ?,Designation = ?, Profile = ?,Organisation = ?, Start_Date = ?,End_Date = ?,Currently_Working = ?, Role_Description = ? WHERE User_id = ? and id = ?';

            const value = [Job_title, Job_type, Designation, Profile, Organisation, Start_Date, End_Date, Currently_Working, Role_Description, user_id, key]

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

// delete_job
exports.delete_job = async (req, res) => {

    const db = await database() //connecting database

    conn = await db.getConnection(); //transition connected to database

    const user_id = req.User_id

    const { id } = req.params;

    const deleteRowQuery = 'DELETE FROM work_experience WHERE User_id = ? AND id = ?';

    const values = [user_id, id];

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