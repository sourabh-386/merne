const path = require('path')
const mysql = require('mysql2/promise')
const { database } = require('../../Config/ConfigDatabase.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const multer = require('multer')


// ----------------------------------------------------------------------

//send extra info
exports.UsergenralInfo = async (req, res) => {

    const db = await database() //connecting database

    let conn;

    try {

        const data = req.body

        const user_id = req.User_id
        const Experience_year = data.Experience_year.trim()
        const Projects_no = data.Projects_no.trim()
        const Working_type = data.Working_type.trim()
        const Manage_freelance = data.Manage_freelance.trim()
        const Opnion = data.Opnion.trim()
        const Employment_Type = data.Employment_Type.join()

        const sql_querry = `INSERT INTO client_genral_info (User_id,Experience_year,Projects_no,Team_to_manage_work,Preferd_job_type,Manage_freelance,Opnion) VALUES (?,?,?,?,?,?,?)`
        const values = [user_id, Experience_year, Projects_no, Working_type, Employment_Type, Manage_freelance, Opnion]

        // console.log(values)

        conn = await db.getConnection(); //transition connected to database


        await conn.beginTransaction(); //transition start

        const sql_querry_return = await conn.query(sql_querry, values);
        console.log(sql_querry_return)

        await conn.commit();

        conn.release();

        res.status(200).send({ 'val': 'data inserted' });


    }
    catch (error) {
        console.log(error)
        await conn.rollback();
        conn.release();
        console.log(error)
        res.status(404).send({ 'val': 'Somthing went wrong' })
    }


}
// ------------------------------------------------------------

//send complete user info to database

// const { upload } = require('../../Config/ConfigStorage.js')
// const fs = require('fs');

exports.EmpDetaillInfo = async (req, res) => {

    const user_id = req.User_id

    const data = req.body

    const db = await database() //connecting database

    let conn;

    // --------------------------------------------------------------------------

    const Personal_details = data.Personal_details

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


    const personal_info_sql = `INSERT INTO Personal_info (User_id,First_Name, Middle_Name, Last_Name, DOB, Gender, Email, Phone, Address1, Address2, Country, State, City, Pin_Code) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    const personal_data = [user_id, First_Name, Middle_Name, Last_Name, DOB, Gender, Email, Phone, Address1, Address2, Country, State, City, Pin_Code]


    // extracting job info data with sql 

    const job_data = data.Job_details

    const job_querry = 'INSERT INTO work_experience (User_id ,Job_title,Job_type,Designation,Profile,Organisation,Location,Start_Date,End_Date,Currently_Working,Role_Description,id) VALUES ?;'

    const job_transformedData = job_data.map(item => [
        user_id,
        item.Job_title,
        item.Job_type,
        item.Designation.trim(),
        item.Profile.trim(),
        item.Organisation.trim(),
        item.Location.trim(),
        item.Start_Date,
        item.End_Date ? item.End_Date : null,
        item.Currently_Working,
        item.Role_Description.trim(),
        item.key
    ]);


    ////extracting education details

    const Education_detail = data.Education_detail

    const Education_detail_querry = 'INSERT INTO Education_details (User_id ,Collage_School,Board,Degree,Stream,Start_date,End_date,Percentage,Study,City,id) VALUES ?;'

    const Education_detail_transformedData = Education_detail.map(item => [
        user_id,
        item.Collage_School.trim(),
        item.Board.trim(),
        item.Degree.trim(),
        item.Stream.trim(),
        item.Start_date,
        item.End_date,
        item.Percentage ? item.Percentage : null,
        item.Study.trim(),
        item.City ? item.City.trim() : null,
        item.id
    ]);


    ////extracting education details

    const Project_detail = data.Project_detail

    const Project_detail_querry = 'INSERT INTO Project (User_id ,Project_name,Start_date,End_Date,Ongoing,Description,Project_link,id) VALUES ?;'

    const Project_detail_transformedData = Project_detail.map(item => [
        user_id,
        item.Project_name.trim(),
        item.Start_Date,
        item.End_Date ? item.End_Date : null,
        item.Ongoing,
        item.Description.trim(),
        item.Project_link.trim(),
        item.id
    ]);

    const Skill_links = data.Skill_links

    const skill_link_sql = `INSERT INTO Skills_links (User_id,Skills, Github_Profile, Linkdin_Profile, Portfolio_link, work_sample1, work_sample2, work_sample3, work_sample4, work_sample5) VALUES (?,?,?,?,?,?,?,?,?,?)`

    const Skills_links_data = [
        user_id,
        Skill_links[0].Skills,
        Skill_links[1].Github_Profile ? Skill_links[1].Github_Profile : '',
        Skill_links[2].Linkdin_Profile ? Skill_links[2].Linkdin_Profile : '',
        Skill_links[3].Portfolio_link ? Skill_links[3].Portfolio_link : '',
        Skill_links[4].Other_work[0] ? Skill_links[4].Other_work[0] : '',
        Skill_links[4].Other_work[1] ? Skill_links[4].Other_work[1] : '',
        Skill_links[4].Other_work[2] ? Skill_links[4].Other_work[2] : '',
        Skill_links[4].Other_work[3] ? Skill_links[4].Other_work[3] : '',
        Skill_links[4].Other_work[4] ? Skill_links[4].Other_work[4] : ''
    ]

    console.log(Skills_links_data)


    try {
        conn = await db.getConnection(); //transition connected to database

        await conn.beginTransaction(); //transition start

        await conn.query(personal_info_sql, personal_data); //saving personal data

        await conn.query(job_querry, [job_transformedData]); //saving educational data

        await conn.query(Education_detail_querry, [Education_detail_transformedData]); //saving personal data

        await conn.query(Project_detail_querry, [Project_detail_transformedData]); //saving educational details

        await conn.query(skill_link_sql, Skills_links_data); //saving educational detail

        await conn.commit();

        conn.release();

        res.status(200).send({ 'val': 'Profile Completed' })


    } catch (error) {
        await conn.rollback();
        conn.release();
        console.log(error)
        res.status(404).send({ 'val': 'Somthing went wrong try again' })
    }



}