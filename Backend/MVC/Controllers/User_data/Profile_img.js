const { database } = require('../../../Config/ConfigDatabase.js')


exports.Profile_img_uploader = async (req, res) => {

    const db = await database() //connecting database

    const conn = await db.getConnection(); //transition connected to database

    const profile_image_name = req.body.name
    const profile_image_url = req.body.url

    const user_id = req.User_id

    try {
        const querry = 'SELECT COUNT(*) as count FROM documents WHERE User_id = ?'
        const [count] = await conn.query(querry, [user_id]);
        await conn.beginTransaction(); //transition start

        if (count[0].count == 0) {

            const query = 'INSERT INTO documents (User_id, profile_image_name, profile_image_url) VALUES (?, ?, ?);';

            const values = [user_id, profile_image_name, profile_image_url];

            await conn.query(query, values);

            await conn.commit();
            conn.release();
            res.status(200).send({ 'val': 'Resume uploaded sucessfully' })
        }
        else {

            const updateRowQuery = 'UPDATE documents SET profile_image_name = ?, profile_image_url = ? WHERE User_id = ? ';

            const values = [profile_image_name, profile_image_url, user_id]

            await conn.query(updateRowQuery, values);


            await conn.commit();
            conn.release();
            res.status(200).send({ 'val': 'Resume updated sucessfully' })
        }

    } catch (error) {
        console.log(error)
        await conn.rollback();
        conn.release();
        res.status(400).send({ 'val': 'Something went wrong try again' })

    }

}