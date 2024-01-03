// submit data main table complete data submittion

const Submit_btn = async (empDetails, user_data, dispatch, set_React_loader, toast, navigate, setData2) => {

    const Personal_details = user_data.Personal_detail //personal onfo

    const Job_details = user_data.job_form_data //job info

    const Education_detail = user_data.education_form_data //educational detail

    const Project_detail = user_data.project_form_data //project detail

    const Skills = user_data.Skills.join() //skill info

    const Links = user_data.Links //extra links

    const Skill_links = [{ Skills: Skills }, ...Links] //combine links and skill

    let value = {
        Personal_details: Personal_details,
        Job_details: Job_details,
        Education_detail: Education_detail,
        Project_detail: Project_detail,
        Skill_links: Skill_links,
    }


    try {

        dispatch(set_React_loader(true))

        const res = await empDetails(value)

        dispatch(set_React_loader(false))


        if (res.data) {


            toast.success(res.data.val)

            dispatch(setData2(true))

            navigate('/userProfile')

        }
        if (res.error) { toast.error(res.error.data.val) }

    } catch (error) {

        console.log(error)
        dispatch(set_React_loader(false))

        toast.error('Something went wrong try again.')

    }


}

// --------------------------------------------------------------------

//this function will set data of emp_box and store then in session

const Emp_box_data = async (value, sendEmpboxData, toast, dispatch, setData1) => {

    try {

        const res = await sendEmpboxData(value)

        console.log(res)
        if (res.data) { dispatch(setData1(true)) }

        else if (res.error) {
            // console.log(res.error)
            toast.error(res.error.data.val)
        }

    } catch (error) {
        console.log(error)
        toast.error('Something went wrong.')
    }

}

// ----------------------------------------------------------------------

export {
    Submit_btn, Emp_box_data
}