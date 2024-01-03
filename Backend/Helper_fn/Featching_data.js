const fs = require('fs');

exports.featching_all = async (conn, User_id) => {

    //getting user genral data
    // const [genral_data] = await conn.query(user_genral_info, User_id);

    const client_signup_info = 'SELECT User_id,Job,Current_CTC,Expected_CTC,Desired_Job FROM client_detail WHERE User_id = ?';

    const user_genral_info = 'SELECT * FROM client_genral_info WHERE User_id = ?';

    const user_personal_info = 'SELECT * FROM Personal_info WHERE User_id = ?';

    const documents_info = 'SELECT resume_file_name,resume_file_url,profile_image_url FROM documents WHERE User_id = ?';

    const work_experience = `SELECT JSON_OBJECT(
        'User_id', User_id,
        'key', id,
        'Job_title', Job_title,
        'Job_type', Job_type,
        'Designation', Designation,
        'Profile', Profile,
        'Organisation', Organisation,
        'Location', Location,
        'Start_Date', Start_Date,
        'End_Date', End_Date,
        'Currently_Working', Currently_Working,
        'Role_Description', Role_Description
    ) AS work_experience_object
    FROM work_experience
    WHERE User_id = ?`;

    const Education_details = `SELECT JSON_OBJECT(
        'User_id', User_id,
        'Collage_School', Collage_School,
        'Board', Board,
        'Degree', Degree,
        'Stream', Stream,
        'Start_date', Start_date,
        'End_date', End_date,
        'Percentage', Percentage,
        'Study', Study,
        'City', City,
        "id",id

    ) AS Education_details_object
FROM Education_details WHERE User_id = ? `;

    const Project_details = `SELECT JSON_OBJECT(
    'User_id', User_id,
    'Project_name', Project_name,
    'Start_Date', Start_date,
    'End_date', End_date,
    'Ongoing', Ongoing,
    'Project_link', Project_link,
    "id",id

) AS Project_details_object
FROM Project WHERE User_id = ? `;


    const Tranning_details = `SELECT JSON_OBJECT(
    'User_id', User_id,
    'Program_name', Program_name,
    'Organisation', Organisation,
    'Start_Date', Start_date,
    'End_date', End_date,
    'Ongoing', Ongoing,
    'Online', Online,
    'Location', Location,
    'Description', Description,
    'file_name', file_name,
    'document', document,
    "id",id

) AS Tranning_details_object
FROM Tranning WHERE User_id = ? `;


    const user_files = `SELECT JSON_OBJECT(
        'file_data', file_data
    ) AS files_object from files WHERE User_id = ?`;

    const Skills_links = `SELECT JSON_OBJECT(
        'User_id', User_id,
        'User_number', User_number,
        'Skills', Skills,
        'Github_Profile', Github_Profile,
        'Linkdin_Profile', Linkdin_Profile,
        'Portfolio_link', Portfolio_link,
        'work_sample1', work_sample1,
        'work_sample2', work_sample2,
        'work_sample3', work_sample3,
        'work_sample4', work_sample4,
        'work_sample5', work_sample5
    ) AS Skills_links_object from Skills_links WHERE User_id = ? `;



    const [client_signup_info_data] = await conn.query(client_signup_info, User_id);
    const [user_genral_info_data] = await conn.query(user_genral_info, User_id);
    const [user_personal_info_data] = await conn.query(user_personal_info, User_id);
    const [work_experience_data] = await conn.query(work_experience, User_id);
    const [project_data] = await conn.query(Project_details, User_id);
    const [Education_details_data] = await conn.query(Education_details, User_id);
    const [Tranning_details_data] = await conn.query(Tranning_details, User_id);
    const [Skills_links_data] = await conn.query(Skills_links, User_id);
    const [document_data] = await conn.query(documents_info, User_id);



    // Convert Buffer to JSON for each result
    // const work_experience_data_new = work_experience_data.map((result) => {
    //     const jsonString = result.work_experience_object.toString('utf8');
    //     return JSON.parse(jsonString);
    // });

    const work_experience_data_new = work_experience_data.map((result) => {
        const jsonString = JSON.stringify(result.work_experience_object);
        return JSON.parse(jsonString);
    });
    


    const Education_details_new = Education_details_data.map((result) => {
        const jsonString = JSON.stringify(result.Education_details_object);
        return JSON.parse(jsonString);
    });

    const Project_details_new = project_data.map((result) => {
        const jsonString = JSON.stringify(result.Project_details_object);
        return JSON.parse(jsonString);
    });

    const Tranning_details_data_new = Tranning_details_data.map((result) => {
        const jsonString = JSON.stringify(result.Tranning_details_object);
        return JSON.parse(jsonString);
    });

    const Skills_links_data_new = Skills_links_data.map((result) => {
        const jsonString = JSON.stringify(result.Skills_links_object);
        return JSON.parse(jsonString);
    });


    return ({

        client_signup_info_data: client_signup_info_data,
        user_genral_info_data: user_genral_info_data,
        user_personal_info_data: user_personal_info_data,
        document_data: document_data,
        work_experience_data_new: work_experience_data_new,
        Project_details_new: Project_details_new,
        Education_details_new: Education_details_new,
        Tranning_details_data_new: Tranning_details_data_new,
        Skills_links_data_new: Skills_links_data_new
    })


}