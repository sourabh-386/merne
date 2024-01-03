const { database } = require('../../../Config/ConfigDatabase.js')


exports.Resume_uploader = async (req, res) => {

    const db = await database() //connecting database

    const conn = await db.getConnection(); //transition connected to database

    const resume_file_name = req.body.name
    const resume_file_url = req.body.url

    const user_id = req.User_id

    // console.log(resume_file_name, resume_file_url, req.body)
    // res.send('sss')

    try {
        const querry = 'SELECT COUNT(*) as count FROM documents WHERE User_id = ?'
        const [count] = await conn.query(querry, [user_id]);
        await conn.beginTransaction(); //transition start

        if (count[0].count == 0) {

            const query = 'INSERT INTO documents (User_id, resume_file_name, resume_file_url) VALUES (?, ?, ?);';

            const values = [user_id, resume_file_name, resume_file_url];

            await conn.query(query, values);

            await conn.commit();
            conn.release();
            res.status(200).send({ 'val': 'Uploaded sucessfully' })
        }
        else {

            const updateRowQuery = 'UPDATE documents SET resume_file_name = ?, resume_file_url = ? WHERE User_id = ? ';

            const values = [resume_file_name, resume_file_url, user_id]

            await conn.query(updateRowQuery, values);


            await conn.commit();
            conn.release();
            res.status(200).send({ 'val': 'Updated sucessfully' })
        }

    } catch (error) {
        console.log(error)
        await conn.rollback();
        conn.release();
        res.status(400).send({ 'val': 'Something went wrong try again' })

    }

}