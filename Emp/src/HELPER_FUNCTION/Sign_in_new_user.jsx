// validating new user by jwt 

const send_login_data = async (
    email, password,

    addDataLogin, navigate, dispatch, set_React_loader, toast,

    setIsAuthenticated, setData1, setData2, set_Resume_name,
    set_Resume_url,
    set_user_image, set_User_id,

    set_personal_detail, set_genral_info, set_job_form_data,
    set_project_form_data, set_tranning_form_data, set_education_form_data,
    set_create_account_details,

    add_skills,
    set_Github_Profile,
    set_Linkdin_Profile,
    set_Portfolio_link,
    set_Other_work

) => {

    const data = [email, password]

    try {

        dispatch(set_React_loader(true))

        const res = await addDataLogin(data)

        console.log(res)

        dispatch(set_React_loader(false))

        if (res.data) {

            const token = 'Bearer ' + res.data.token

            localStorage.setItem('token', token) //shaving token in localstorage

            dispatch(setIsAuthenticated(true)) //saving in redux store for instant calling

            dispatch(setData1(res.data.Data1)) // check if initial form is filled or not

            dispatch(setData2(res.data.Data2)) // check if main form is filled or not

            dispatch(set_User_id(res.data.User_id)) // set user id

            const redux_data = res.data.output

            console.log(redux_data)

            // saving data in redux state after fetching from database 

            // const user_image = redux_data.user_image_new
            // if (user_image && user_image.length > 0) { dispatch(set_user_image(user_image[0])) }

            const genrel_info = redux_data.user_genral_info_data
            if (genrel_info && genrel_info.length > 0) { dispatch(set_genral_info(genrel_info[0])) }

            const Personal_detail = redux_data.user_personal_info_data
            if (Personal_detail && Personal_detail.length > 0) { dispatch(set_personal_detail(Personal_detail[0])) }

            const document_detail = redux_data.document_data
            if (document_detail && document_detail.length > 0) {
                dispatch(set_Resume_name(document_detail[0].resume_file_name))
                dispatch(set_Resume_url(document_detail[0].resume_file_url))
                dispatch(set_user_image(document_detail[0].profile_image_url))
            }

            const education = redux_data.Education_details_new
            if (education && education.length > 0) { education.map(val => { dispatch(set_education_form_data(val)) }) }

            const project = redux_data.Project_details_new
            if (project && project.length > 0) { project.map(val => { dispatch(set_project_form_data(val)) }) }

            const tranning = redux_data.tranning_data_new
            if (tranning && tranning.length > 0) { tranning.map(val => { dispatch(set_tranning_form_data(val)) }) }

            const work = redux_data.work_experience_data_new
            if (work.length > 0) { work.map(val => { dispatch(set_job_form_data(val)) }) }

            const Tranning = redux_data.Tranning_details_data_new
            if (Tranning.length > 0) { Tranning.map(val => { dispatch(set_tranning_form_data(val)) }) }

            const skill_link = redux_data.Skills_links_data_new
            if (skill_link && skill_link.length > 0) {

                if (skill_link[0].Skills.length > 0) { dispatch(add_skills(skill_link[0].Skills.split(','))) }

                if (skill_link[0].Github_Profile.length > 0) { dispatch(set_Github_Profile(skill_link[0].Github_Profile)) }

                if (skill_link[0].Linkdin_Profile.length > 0) { dispatch(set_Linkdin_Profile(skill_link[0].Linkdin_Profile)) }

                if (skill_link[0].Portfolio_link.length > 0) { dispatch(set_Portfolio_link(skill_link[0].Portfolio_link)) }

                if (skill_link[0].work_sample1.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample1)) }

                if (skill_link[0].work_sample2.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample2)) }

                if (skill_link[0].work_sample3.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample3)) }

                if (skill_link[0].work_sample4.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample4)) }

            }

            const login_info = redux_data.client_signup_info_data

            if (login_info && login_info.length > 0) {

                dispatch(set_create_account_details({ 'name': 'Work', 'value': login_info[0].Job }))
                dispatch(set_create_account_details({ 'name': 'Desired_Job', 'value': login_info[0].Desired_Job }))
                dispatch(set_create_account_details({ 'name': 'Current_CTC', 'value': login_info[0].Current_CTC }))
                dispatch(set_create_account_details({ 'name': 'Expected_CTC', 'value': login_info[0].Expected_CTC }))
            }

            res.data.Data2 ? navigate('/home') : '' //navigate to home page when form is filled

        }
        else if (res.error) { toast.error(res.error.data.val) }

    } catch (error) {
        console.log(error)

        dispatch(set_React_loader(false))

        toast.error('Something Went Wrong Try Again')
    }

}
// ---------------------------------------------------------------
// validating new user by google 

const send_login_data_google = async (
    res,
    navigate, dispatch, set_React_loader, toast,

    setIsAuthenticated, setData1, setData2, set_Resume_name,
    set_Resume_url,
    set_user_image,

    set_personal_detail, set_genral_info, set_job_form_data, set_User_id,
    set_project_form_data, set_tranning_form_data, set_education_form_data,
    set_create_account_details,

    add_skills,
    set_Github_Profile,
    set_Linkdin_Profile,
    set_Portfolio_link,
    set_Other_work

) => {

    console.log('2')
    try {

        if (res.data) {

            console.log(res.data)

            const token = 'Bearer ' + res.data.token

            localStorage.setItem('token', token) //shaving token in localstorage

            dispatch(setIsAuthenticated(true)) //saving in redux store for instant calling

            dispatch(setData1(res.data.Data1)) // check if initial form is filled or not

            dispatch(setData2(res.data.Data2)) // check if main form is filled or not

            dispatch(set_User_id(res.data.User_id)) // set user id

            const redux_data = res.data.output

            console.log('output', res.data.output)

            // saving data in redux state after fetching from database 

            // const user_image = redux_data.user_image_new

            // if (user_image && user_image.length > 0) { dispatch(set_user_image(user_image[0])) }

            const genrel_info = redux_data.user_genral_info_data

            if (genrel_info && genrel_info.length > 0) { dispatch(set_genral_info(genrel_info[0])) }

            const Personal_detail = redux_data.user_personal_info_data
            if (Personal_detail && Personal_detail.length > 0) { dispatch(set_personal_detail(Personal_detail[0])) }

            const document_detail = redux_data.document_data
            if (document_detail && document_detail.length > 0) {
                dispatch(set_Resume_name(document_detail[0].resume_file_name))
                dispatch(set_Resume_url(document_detail[0].resume_file_url))
                dispatch(set_user_image(document_detail[0].profile_image_url))
            }

            const education = redux_data.Education_details_new
            if (education && education.length > 0) { education.map(val => { dispatch(set_education_form_data(val)) }) }

            const project = redux_data.Project_details_new
            if (project && project.length > 0) { project.map(val => { dispatch(set_project_form_data(val)) }) }

            const tranning = redux_data.tranning_data_new
            if (tranning && tranning.length > 0) { tranning.map(val => { dispatch(set_tranning_form_data(val)) }) }

            const work = redux_data.work_experience_data_new
            if (work.length > 0) { work.map(val => { dispatch(set_job_form_data(val)) }) }

            const Tranning = redux_data.Tranning_details_data_new
            if (Tranning.length > 0) { Tranning.map(val => { dispatch(set_tranning_form_data(val)) }) }

            const skill_link = redux_data.Skills_links_data_new
            if (skill_link && skill_link.length > 0) {

                if (skill_link[0].Skills.length > 0) { dispatch(add_skills(skill_link[0].Skills.split(','))) }

                if (skill_link[0].Github_Profile.length > 0) { dispatch(set_Github_Profile(skill_link[0].Github_Profile)) }

                if (skill_link[0].Linkdin_Profile.length > 0) { dispatch(set_Linkdin_Profile(skill_link[0].Linkdin_Profile)) }

                if (skill_link[0].Portfolio_link.length > 0) { dispatch(set_Portfolio_link(skill_link[0].Portfolio_link)) }

                if (skill_link[0].work_sample1.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample1)) }

                if (skill_link[0].work_sample2.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample2)) }

                if (skill_link[0].work_sample3.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample3)) }

                if (skill_link[0].work_sample4.length > 0) { dispatch(set_Other_work(skill_link[0].work_sample4)) }

            }

            const login_info = redux_data.client_signup_info_data

            if (login_info && login_info.length > 0) {

                dispatch(set_create_account_details({ 'name': 'Work', 'value': login_info[0].Job }))
                dispatch(set_create_account_details({ 'name': 'Desired_Job', 'value': login_info[0].Desired_Job }))
                dispatch(set_create_account_details({ 'name': 'Current_CTC', 'value': login_info[0].Current_CTC }))
                dispatch(set_create_account_details({ 'name': 'Expected_CTC', 'value': login_info[0].Expected_CTC }))
            }

            res.data.Data2 ? navigate('/home') : '' //navigate to home page when form is filled

        }
        else if (res.error) { toast.error(res.error.data.val) }

    } catch (error) {
        console.log(error)

        dispatch(set_React_loader(false))

        toast.error('Something Went Wrong Try Again')
    }

}


export { send_login_data, send_login_data_google }