const { database } = require('../../../Config/ConfigDatabase.js')
const dotenv = require('dotenv')
dotenv.config()

// signup function 
exports.save_tranning = async (req, res) => {

    const db = await database() //connecting database

    let conn = await db.getConnection(); //transition connected to database

    const user_id = req.User_id

    const tranning = req.body
    console.log(tranning)

    const Program_name = tranning.Program_name.trim()
    const Organisation = tranning.Organisation.trim()
    const Start_Date = tranning.Start_Date
    const End_Date = tranning.End_Date
    const Ongoing = tranning.Ongoing ? "True" : 'False'
    const Online = tranning.Online ? "True" : 'False'
    const Location = tranning.Location.trim()
    const Description = tranning.Description.trim()
    const document = tranning.document
    const file_name = tranning.file_name.trim()
    const id = tranning.id



    try {

        const querry = 'SELECT COUNT(*) as count FROM Tranning WHERE User_id = ? AND id = ?;'
        const [count] = await conn.query(querry, [user_id, id]);

        await conn.beginTransaction(); //transition start

        if (count[0].count == 0) {

            const query = 'INSERT INTO Tranning (User_id, Program_name,Organisation, Start_Date, End_Date, Ongoing,Online,Location, Description,file_name,document,id) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?,?,?);';

            const values = [user_id, Program_name, Organisation, Start_Date, End_Date, Ongoing, Online, Location, Description, file_name, document, id];

            await conn.query(query, values);


            await conn.commit();
            conn.release();
            res.status(200).send({ 'val': 'Data saved' })
        }
        else {

            const updateRowQuery = 'UPDATE Tranning SET Program_name=?,Organisation=?, Start_Date=?, End_Date=?, Ongoing=?,Online=?,Location=?, Description=?,file_name=?,document=? WHERE User_id = ? and id = ?';
            console.log(document)

            const values = [Program_name, Organisation, Start_Date, End_Date, Ongoing, Online, Location, Description, file_name, document, user_id, id]

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
exports.delete_tranning = async (req, res) => {

    const db = await database() //connecting database

    conn = await db.getConnection(); //transition connected to database

    const user_id = req.User_id

    const { id } = req.params;

    const deleteRowQuery = 'DELETE FROM Tranning WHERE User_id = ? AND id = ?';

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