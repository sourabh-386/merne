const { database } = require('../../../Config/ConfigDatabase.js')
const dotenv = require('dotenv')
dotenv.config()

// signup function 
exports.save_personal = async (req, res) => {

    const db = await database() //connecting database

    conn = await db.getConnection(); //transition connected to database

    const user_id = req.User_id

    const Personal_details = req.body

    const First_Name = Personal_details.First_Name.trim()
    const Middle_Name = Personal_details.Middle_Name ? Personal_details.Middle_Name.trim() : ''
    const Last_Name = Personal_details.Last_Name ? Personal_details.Last_Name.trim() : ''
    const DOB = Personal_details.DOB
    const Gender = Personal_details.Gender
    const Email = Personal_details.Email.trim()
    const Phone = Personal_details.Phone
    const Address1 = Personal_details.Address1.trim()
    const Address2 = Personal_details.Address2 ? Personal_details.Address2.trim() : ''
    const Country = Personal_details.Country.label
    const State = Personal_details.State.trim()
    const City = Personal_details.City.trim()
    const Pin_Code = Personal_details.Pin_Code.trim()

console.log(First_Name)
    try {

        const querry = `SELECT COUNT(*) as count FROM Personal_info WHERE User_id = ? ;`
        const [count] = await conn.query(querry, user_id);

        await conn.beginTransaction(); //transition start

        if (count[0].count = 0) {

            const personal_info_sql = `INSERT INTO Personal_info (User_id,First_Name, Middle_Name, Last_Name, DOB, Gender, Email, Phone, Address1, Address2, Country, State_, City, Pin_Code) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

            const personal_data = [user_id, First_Name, Middle_Name, Last_Name, DOB, Gender, Email, Phone, Address1, Address2, Country, State, City, Pin_Code]

            const personal_res = await conn.query(personal_info_sql, personal_data); //saving personal data


        }
        else {

            const updateRowQuery = 'UPDATE Personal_info SET First_Name = ?, Middle_Name = ?,Last_Name = ?, DOB = ?,Gender = ?, Email = ?,Phone = ?,Address1 = ?, Address2 = ?,Country = ?, State = ?,City = ?, Pin_Code = ? WHERE User_id = ?';

            const value = [First_Name, Middle_Name, Last_Name, DOB, Gender, Email, Phone, Address1, Address2, Country, State, City, Pin_Code, user_id]

            await conn.query(updateRowQuery, value); //saving educational data

        }

        await conn.commit();
        conn.release();
        res.status(200).send({ 'val': 'Date Saved' })

    } catch (error) {
        console.log(error)
        await conn.rollback();
        conn.release();
        res.status(400).send({ 'val':'Something went wrong' })
    }

}