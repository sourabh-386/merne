import React, { useState } from 'react'
import style_main from './Work_experience.module.css'
import style from '../Emp_education/Emp_education_detail.module.css'
import Job_form from '../../COMPONENT/EMP_DETAILS_COMP/Job_form/Job_form'
// import { set_job_form } from '../../REDUX/REDUCER/Emp_reducer'
import { set_background_blur } from '../../REDUX/REDUCER/Emp_reducer'
import { useDispatch, useSelector } from 'react-redux'
// import Job_form_show from '../../COMPONENT/EMP_DETAILS_COMP/Job_form/Job_form_show'
import Job_comp from '../../COMPONENT/Profile_page_comp/Job_comp/Job_comp'
const Work_experience = () => {

    const [job_form, set_job_form] = useState(false)

    const dispatch = useDispatch()

    const form = useSelector(state => state.Reducer1.job_form)

    const form_data = useSelector(state => state.Reducer1.job_form_data)

    // console.log(form_data)

    //show add experience

    const show_add_experience = () => {
        dispatch(set_background_blur(true))
        set_job_form(true)
    }

    return (
        <div className={style.education}>

            <div className={style.education}>
                {/* <div className={style.btn_box}>
                    <button
                        className={style.add_education}
                        onClick={() => { show_add_experience() }}
                    ><b>+ Add Experience</b>
                    </button>
                </div> */}
                <div className={style.educatinal_details}>
                    {/* <Job_form_show set_job_form={set_job_form} /> */}
                    <Job_comp set_job_form={set_job_form} />

                </div>
            </div>
            <div className={`${style_main.form} ${job_form ? '' : style_main.form_hid}`}>
                <Job_form
                    dispatch={dispatch}
                    set_job_form={set_job_form}
                    set_background_blur={set_background_blur}
                />
            </div>
        </div>
    )
}

export default Work_experience