const { database } = require('../../../Config/ConfigDatabase.js')


exports.save_links = async (req, res) => {

    const db = await database() //connecting database

    conn = await db.getConnection(); //transition connected to database

    const user_id = req.User_id

    const Skill_links = req.body

    const Skills_links_data = [
        Skill_links.Github_Profile ? Skill_links.Github_Profile : '',
        Skill_links.Linkdin_Profile ? Skill_links.Linkdin_Profile : '',
        Skill_links.Portfolio_link ? Skill_links.Portfolio_link : '',
        Skill_links.Other_work[0] ? Skill_links.Other_work[0] : '',
        Skill_links.Other_work[1] ? Skill_links.Other_work[1] : '',
        Skill_links.Other_work[2] ? Skill_links.Other_work[2] : '',
        Skill_links.Other_work[3] ? Skill_links.Other_work[3] : '',
        Skill_links.Other_work[4] ? Skill_links.Other_work[4] : ''
    ]
    console.log(Skills_links_data)

    try {

        const querry = 'SELECT COUNT(*) as count FROM Skills_links WHERE User_id = ?;'
        const [count] = await conn.query(querry, user_id);

        await conn.beginTransaction(); //transition start

        if (count[0].count == 0) {

            const skill_link_sql = `INSERT INTO Skills_links (User_id,Github_Profile, Linkdin_Profile, Portfolio_link, work_sample1, work_sample2, work_sample3, work_sample4, work_sample5) VALUES (?,?,?,?,?,?,?,?,?)`

            await conn.query(skill_link_sql, [user_id, ...Skills_links_data]);

            await conn.commit();
            conn.release();
            res.status(200).send({ 'val': 'Data saved' })
        }
        else {

            const updateRowQuery = 'UPDATE Skills_links SET Github_Profile=?, Linkdin_Profile=?, Portfolio_link=?, work_sample1=?, work_sample2=?, work_sample3=?, work_sample4=?, work_sample5=? WHERE User_id = ? ';

            const value = [...Skills_links_data, user_id]

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