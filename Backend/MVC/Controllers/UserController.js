const { database } = require('../../Config/ConfigDatabase.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const { forgot_password_mail_fn } = require('../../Config/ConfigEmail.js')
const { featching_all } = require('../../Helper_fn/Featching_data.js')
// -------------------------------------------------------------------------------- 

// signup function creating user
exports.user_signin = async (req, res) => {

    const db = await database() //connecting database

    let conn;

    try {

        const value = req.body

        let Work = value[0].Work.value
        let Current_CTC = value[1].Current_CTC.value
        let Expected_CTC = value[2].Expected_CTC.value
        let Desired_Job = value[3].Desired_Job.trim()
        let First_name = value[4].First_name.trim()
        let Last_name = value[5].Last_name.trim()
        let Phone = value[6].Phone
        let Email = value[7].Email.trim()
        let Password = value[8].Password.trim()
        let Confirm_Password = value[9].confirm_Password.trim()
        let Agree = value[10].Agree

        if (Password === Confirm_Password) {//password matching with confirm password

            const salt = await bcrypt.genSalt(10) //use for password incription

            const Encripted_password = await bcrypt.hash(Password, salt) //encripted password

            // console.log(jwtToken)

            conn = await db.getConnection(); //transition connected to database

            const sql_querry = `INSERT INTO client_detail (Email, Password,Phone,First_name,Last_name,Job,Current_CTC,Expected_CTC,Desired_Job,Agree) VALUES (?,?,?,?,?,?,?,?,?,?)`
            const values = [Email, Encripted_password, Phone, First_name, Last_name, Work, Current_CTC, Expected_CTC, Desired_Job, Agree]

            await conn.beginTransaction(); //transition start

            await conn.query(sql_querry, values);

            const [userIdResult] = await conn.query(`SELECT User_id FROM client_detail WHERE Email = ?`, [Email]);

            const User_id = userIdResult[0].User_id;

            const jwtToken = jwt.sign({ user_email: Email, user_id: User_id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' }) //GENRATING JWT TOKEN

            await conn.commit();

            conn.release();

            res.status(200).send({ 'val': 'sucess', 'token': jwtToken, User_id: User_id });

        }
        else {

            res.status(402).send({ 'val': 'Password not match' });

        }


    } catch (error) {

        console.log(error)
        if (error && error.code === 'ER_DUP_ENTRY') { res.status(409).send({ 'val': 'User already exists.' }) }

        else {

            await conn.rollback();
            conn.release();
            res.status(500).send(error);

        }

    }

}

// ---------------------------------------------------------------------------------------------------- 


// login function already registerd

exports.user_login = async (req, res) => {

    const db = await database() //connecting database

    let conn;

    try {

        conn = await db.getConnection(); //transition connected to database

        const value = req.body

        const User_Email = value.Email.trim()

        const User_Password = value.Password.trim()

        sql = `Select Email,Password,User_id from client_detail where Email=  ?`;
        const [result] = await conn.query(sql, User_Email);

        if (result.length > 0) {

            const Password = result[0].Password

            const User_id = result[0].User_id

            const ismatch = await bcrypt.compare(User_Password, Password)

            console.log(User_Password, ismatch)


            if (ismatch) {

                const jwtToken = jwt.sign({ user_email: User_Email, user_id: User_id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' }) //GENRATING JWT TOKEN

                //checking genraldetails filled or npt
                const check_user_data = 'SELECT COUNT(*) AS count FROM client_genral_info WHERE User_id = ?';
                const [rows] = await conn.query(check_user_data, User_id);
                const recordExists = rows[0].count > 0;

                //checking personaldetails filled or npt
                const check_user_data2 = 'SELECT COUNT(*) AS count FROM Personal_info WHERE User_id = ?';
                const [rows2] = await conn.query(check_user_data2, User_id);
                const recordExists2 = rows2[0].count > 0;


                const data = await featching_all(conn, User_id)

                conn.release();

                if (recordExists && recordExists2) {
                    res.status(200).send({ 'val': 'Login Successfull', 'token': jwtToken, 'Data1': true, 'Data2': true, 'output': data, User_id: User_id })
                }
                else if (recordExists) {
                    res.status(200).send({ 'val': 'Login Successfull', 'token': jwtToken, 'Data1': true, 'Data2': false, 'output': data, User_id: User_id })
                }
                else if (recordExists2) {
                    res.status(200).send({ 'val': 'Login Successfull', 'token': jwtToken, 'Data2': true, 'Data1': false, 'output': data, User_id: User_id })
                }
                else {
                    res.status(200).send({ 'val': 'Login Successfull', 'token': jwtToken, 'Data1': false, 'Data2': false, 'output': data, User_id: User_id })
                }

            }
            else {
                conn.release();
                res.status(401).send({ 'val': 'Incorrect Password' })
            }



        }
        else {
            conn.release();
            res.status(404).send({ 'val': 'User Not Found' })
        }


    } catch (error) {


        console.error(error);
        // await conn.rollback();
        conn.release();
        res.status(500).send(error);

    }

}



//forgot password
exports.Forgot_password = async (req, res) => {

    try {

        const value = req.body

        console.log(value.Email)

        if (value && value.Email) {

            const user_email = value.Email

            const db = await database() //connecting database

            const sql = `Select Email from client_detail where Email=  ?`;
            const [result] = await db.query(sql, [user_email]);

            if (result && result.length > 0) {

                const jwtToken = jwt.sign({ user_email: user_email }, process.env.JWT_SECRET_KEY_FORGOT_PASSWORD, { expiresIn: '10min' }) //GENRATING JWT TOKEN

                const link_token = jwtToken.split('.').join('ESCAPE')

                const link = `${process.env.FORGOT_PASSWORD_LINK}/${user_email}/${link_token}`
                console.log(link_token)

                const output = await forgot_password_mail_fn(user_email, req, res, link)//sending mail



            } else {
                res.status(404).send({ 'val': 'User Not Found' })

            }

        }
        else {
            res.status(404).send({ 'val': 'User Not Found' })

        }



    } catch (error) {
        console.log(error)

        res.status(404).send({ 'val': 'Somthing went wrong try again' })

    }

}







//forgot password
exports.Reset_password = async (req, res) => {

    try {


        const value = req.body
        const { email, token } = req.params

        const new_token = token.split('ESCAPE').join('.')
        console.log(new_token)

        const ismatch = jwt.verify(new_token, process.env.JWT_SECRET_KEY_FORGOT_PASSWORD)

        console.log(ismatch.user_email, email)

        if (ismatch && ismatch.user_email === email) {

            if (value.Password && value.Confirm_Password && value.Password === value.Confirm_Password) {

                const salt = await bcrypt.genSalt(10) //use for password incription

                const Encripted_password = await bcrypt.hash(value.Password, salt) //encripted password

                const sql = 'UPDATE client_detail SET Password = ? WHERE Email = ?';

                const db = await database() //connecting database
                const conn = await db.getConnection(); //start insertion in database

                const [result] = await db.query(sql, [Encripted_password, email]);

                console.log('Rows affected:', result.affectedRows);
                res.status(200).send({ 'val': 'Password change Successsfully' })


            }
            else {
                res.status(404).send({ 'val': 'password not match' })
            }


        }
        else {
            res.status(404).send({ 'val': 'Something Went wrong try again' })

        }



    } catch (error) {
        console.log(error)

        res.status(404).send({ 'val': 'time out' })
    }


}