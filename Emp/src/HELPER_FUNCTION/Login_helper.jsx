

//remove select style or arrow

const customDropdownIndicator = () => null;

const customStyles = {
    control: (provided) => ({
        ...provided,
        maxHeight: '100px',
        maxWidth: '100%',
        borderBottom: 'none',
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none',
    }),
};

// ---------------------------------------------------------------------------------

//data

const options1 = [
    { value: "Education", label: "Education" },
    { value: "Sales", label: "Sales" },
    { value: "Science & Technology", label: "Science & Technology" },
    { value: "Cunstruction", label: "Cunstruction" },
    { value: "Accounting", label: "Accounting" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Markiting", label: "Markiting" }
];

const Current_CTC = [
    { value: "< $ 5K", label: "< $ 5K " },
    { value: "$ 10K", label: "$ 10K" },
    { value: "$ 15K", label: "$ 15K" },
    { value: "$ 20K", label: "$ 20K" },
    { value: "$ 25k", label: "$ 25k" },
    { value: "$ 30K", label: "$ 30K" },
    { value: "$ 35K", label: "$ 35K" },
    { value: "> $ 40k", label: "> $ 40k" }
];

const Expected_CTC = [
    { value: "< $ 5K", label: "< $ 5K " },
    { value: "$ 10K", label: "$ 10K" },
    { value: "$ 15K", label: "$ 15K" },
    { value: "$ 20K", label: "$ 20K" },
    { value: "$ 25k", label: "$ 25k" },
    { value: "$ 30K", label: "$ 30K" },
    { value: "$ 35K", label: "$ 35K" },
    { value: "> $ 40k", label: "> $ 40k" }
];

// -------------------------------------------------------------------------------------------------------------------- 

// Validation function for email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// -------------------------------------------------------------------------------------------------------------------- 

function isStrongPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Check if the password meets all criteria
    const isStrong =
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar;

    return isStrong;
}

// -------------------------------------------------------------------------------------------------------------------- 


// validating new user by jwt 

// const send_login_data = async (
//     email, password,

//     addDataLogin, navigate, dispatch, set_React_loader, toast,

//     setIsAuthenticated, setData1, setData2, set_user_image,

//     set_personal_detail, set_genral_info, set_job_form_data,
//     set_project_form_data, set_tranning_form_data, set_education_form_data,
//     set_create_account_details,

//     add_skills,
//     set_Github_Profile,
//     set_Linkdin_Profile,
//     set_Portfolio_link,
//     set_Other_work

// ) => {

//     const data = [email, password]

//     try {

//         dispatch(set_React_loader(true))

//         const res = await addDataLogin(data)

//         console.log(res)

//         dispatch(set_React_loader(false))

//         if (res.data) {

//             const token = 'Bearer ' + res.data.token

//             localStorage.setItem('token', token) //shaving token in localstorage

//             dispatch(setIsAuthenticated(true)) //saving in redux store for instant calling

//             dispatch(setData1(res.data.Data1)) // check if initial form is filled or not

//             dispatch(setData2(res.data.Data2)) // check if main form is filled or not

//             const redux_data = res.data.output

//             // saving data in redux state after fetching from database 

//             const user_image = redux_data.user_image_new

//             if (user_image && user_image.length > 0) { dispatch(set_user_image(user_image[0])) }

//             const genrel_info = redux_data.user_genral_info_data

//             if (genrel_info && genrel_info.length > 0) { dispatch(set_genral_info(genrel_info[0])) }

//             const Personal_detail = redux_data.user_personal_info_data[0]

//             dispatch(set_personal_detail(Personal_detail))

//             const education = redux_data.Education_details_new
//             console.log(education)

//             if (education && education.length > 0) { education.map(val => { dispatch(set_education_form_data(val)) }) }

//             const project = redux_data.Project_details_new

//             if (project && project.length > 0) { project.map(val => { dispatch(set_project_form_data(val)) }) }

//             const tranning = redux_data.tranning_data_new

//             if (tranning && tranning.length > 0) { tranning.map(val => { dispatch(set_tranning_form_data(val)) }) }

//             const work = redux_data.work_experience_data_new

//             if (work.length > 0) { work.map(val => { dispatch(set_job_form_data(val)) }) }

//             const skill_link = redux_data.Skills_links_data_new

//             if (skill_link && skill_link.length > 0) {

//                 if (skill_link[0].Skills.length > 0) { dispatch(add_skills(skill_link[0].Skills.split(','))) }

//                 if (skill_link[0].Github_Profile.length > 0) { dispatch(set_Github_Profile(skill_link[0].Github_Profile)) }

//                 if (skill_link[0].Linkdin_Profile.length > 0) { dispatch(set_Linkdin_Profile(skill_link[0].Linkdin_Profile)) }

//                 if (skill_link[0].Portfolio_link.length > 0) { dispatch(set_Portfolio_link(skill_link[0].Portfolio_link)) }

//                 if (skill_link[0].work_sample1.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample1)) }

//                 if (skill_link[0].work_sample2.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample2)) }

//                 if (skill_link[0].work_sample3.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample3)) }

//                 if (skill_link[0].work_sample4.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample4)) }

//             }

//             const login_info = redux_data.client_signup_info_data

//             if (login_info && login_info.length > 0) {

//                 dispatch(set_create_account_details({ 'name': 'Work', 'value': login_info[0].Job }))
//                 dispatch(set_create_account_details({ 'name': 'Desired_Job', 'value': login_info[0].Desired_Job }))
//                 dispatch(set_create_account_details({ 'name': 'Current_CTC', 'value': login_info[0].Current_CTC }))
//                 dispatch(set_create_account_details({ 'name': 'Expected_CTC', 'value': login_info[0].Expected_CTC }))
//             }

//             res.data.Data2 ? navigate('/home') : '' //navigate to home page when form is filled

//         }
//         else if (res.error) { toast.error(res.error.data.val) }

//     } catch (error) {
//         console.log(error)

//         dispatch(set_React_loader(false))

//         toast.error('Something Went Wrong Try Again')
//     }

// }

// ////////// saving data in redux state 

// const saving_redux_data = async (
//     dispatch,

//     set_personal_detail,
//     set_class_10_detail,
//     set_class_12_detail,
//     set_graduation_detail,
//     set_phd_detail,
//     set_diploma_detail,
//     set_job_form_data,
//     add_skills,
//     set_Github_Profile,
//     set_Linkdin_Profile,
//     set_Portfolio_link,
//     set_Other_work,
//     set_genral_info,
//     set_create_account_details_Work,
//     set_create_account_details_Current_CTC,
//     set_create_account_details_Expected_CTC,
//     set_create_account_details_Desired_Job,

//     redux_data,
// ) => {

//     const Personal_detail = redux_data.user_personal_info_data[0]

//     dispatch(set_personal_detail(Personal_detail))

//     const primary_detail = redux_data.user_primary_edu_info_data_new

//     if (primary_detail.length > 0) {

//         primary_detail.map(val => {

//             if (val.Study == 'Secondary (X) ') { dispatch(set_class_10_detail(val)) }

//             else (dispatch(set_class_12_detail(val)))
//         })
//     }

//     const secondry_detail = redux_data.user_secondry_edu_info_data_new

//     if (secondry_detail.length > 0) {

//         secondry_detail.map(val => {

//             if (val.Study == 'UG/PG') { dispatch(set_graduation_detail(val)) }

//             else if (val.Study == 'Diploma') { dispatch(set_diploma_detail(val)) }

//             else (dispatch(set_phd_detail(val)))
//         })
//     }

//     const work = redux_data.work_experience_data_new

//     if (work.length > 0) { work.map(val => { dispatch(set_job_form_data(val)) }) }

//     const skill_link = redux_data.Skills_links_data_new


//     if (skill_link.length > 0) {

//         if (skill_link[0].Skills.length > 0) { skill_link[0].Skills.split(',').map(data => dispatch(add_skills(data))) }

//         if (skill_link[0].Github_Profile.length > 0) { dispatch(set_Github_Profile(skill_link[0].Github_Profile)) }

//         if (skill_link[0].Linkdin_Profile.length > 0) { dispatch(set_Linkdin_Profile(skill_link[0].Linkdin_Profile)) }

//         if (skill_link[0].Portfolio_link.length > 0) { dispatch(set_Portfolio_link(skill_link[0].Portfolio_link)) }

//         if (skill_link[0].work_sample1.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample1)) }

//         if (skill_link[0].work_sample2.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample2)) }

//         if (skill_link[0].work_sample3.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample3)) }

//         if (skill_link[0].work_sample4.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample4)) }

//     }

//     const genrel_info = redux_data.user_genral_info_data

//     if (genrel_info.length > 0) { dispatch(set_genral_info(genrel_info[0])) }

//     const login_info = redux_data.client_signup_info_data

//     if (login_info.length > 0) {

//         dispatch(set_create_account_details_Work(login_info[0].Job))

//         dispatch(set_create_account_details_Desired_Job(login_info[0].Desired_Job))

//         dispatch(set_create_account_details_Current_CTC(login_info[0].Current_CTC))

//         dispatch(set_create_account_details_Expected_CTC(login_info[0].Expected_CTC))

//     }
//     // console.log('dd', login_info, login_info[0])

// }









// -------------------------------------------------------------------------------------------------------------------- 

//forget password email

const send_forgotPassword_email = async (forgotPassword, user_email, dispatch, set_forgot_password) => {

    try {

        const res = await forgotPassword(user_email)

        if (res.data) {

            toast.success('Password Reset link sended to Registerd Email')

            dispatch(set_forgot_password(false))

        }

        else if (res.error) { toast.error(res.error.data.val) }

    }

    catch (error) { toast.error('Something went wrong.') }

}


// -------------------------------------------------------------------------------------------------------------------- 

//reset password

const reset_password = async (value, path, restPassword) => {

    try {

        const res = await restPassword({ value: value, path: path })

        if (res.data) { toast.success('Password changed successfully.') }

        else if (res.error) { toast.error(res.error.data.val) }

    } catch (error) { toast.error('Something went wrong.') }

}

// ---------------------------------------------------------------------------------------------- 

// exporting functions 

export {

    customDropdownIndicator,

    customStyles, options1, Current_CTC, Expected_CTC,

    isStrongPassword,isValidEmail,

    send_forgotPassword_email, reset_password

}