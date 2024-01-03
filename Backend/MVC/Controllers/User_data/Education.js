const { database } = require('../../../Config/ConfigDatabase.js')
const dotenv = require('dotenv')
dotenv.config()

// signup function 
exports.save_education = async (req, res) => {

    const db = await database() //connecting database

    conn = await db.getConnection(); //transition connected to database

    const user_id = req.User_id

    const edu_details = req.body

    const Collage_School = edu_details.Collage_School.trim()
    const Degree = edu_details.Degree.trim()
    const Stream = edu_details.Stream.trim()
    const Board = edu_details.Board
    const Start_date = edu_details.Start_date
    const Comp_date = edu_details.End_date
    const Percentage = edu_details.Percentage?edu_details.Percentage:null
    const Study = edu_details.Study
    const City = edu_details.City.trim()
    const id = edu_details.id


    try {

        const querry = 'SELECT COUNT(*) as count FROM Education_details WHERE User_id = ? AND id = ?;'
        const [count] = await conn.query(querry, [user_id, id]);

        await conn.beginTransaction(); //transition start

        if (count[0].count == 0) {

            const job_query = 'INSERT INTO Education_details ( User_id,Collage_School, Degree, Stream,Board, Start_date, End_date, Percentage, Study,City, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?);';

            const values = [user_id, Collage_School, Degree, Stream, Board, Start_date, Comp_date, Percentage, Study, City, id];

            await conn.query(job_query, values);


            await conn.commit();
            conn.release();
            res.status(200).send({ 'val': 'Data saved' })
        }
        else {

            const updateRowQuery = 'UPDATE Education_details SET Collage_School = ?, Degree = ?,Stream = ?,Board=?, Start_date = ?,End_date = ?, Percentage = ?, Study=?, City= ? WHERE User_id = ? and id = ?';

            const value = [Collage_School, Degree, Stream, Board, Start_date, Comp_date, Percentage, Study, City, user_id, id]

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
exports.delete_education = async (req, res) => {

    const db = await database() //connecting database

    conn = await db.getConnection(); //transition connected to database

    const user_id = req.User_id

    const { id } = req.params;

    const deleteRowQuery = 'DELETE FROM Education_details WHERE User_id = ? AND id = ?';

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