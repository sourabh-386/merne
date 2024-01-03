import { React, useState } from 'react'
import style from '../Emp_education/Emp_education_detail.module.css'
import style2 from '../../PAGES/Profile/Profile.module.css'
import { set_background_blur } from '../../REDUX/REDUCER/Emp_reducer'
import { useDispatch, useSelector } from 'react-redux'
import Project_comp from '../../COMPONENT/Profile_page_comp/Project_comp/Project_comp.jsx/Project_comp'
import Project_form from '../../COMPONENT/Profile_page_comp/Project_comp/Project_form_comp/Project_form'
// import { set_background_blur } from '../../REDUX/REDUCER/Emp_reducer'

const Emp_Project = () => {

    const [project_form, set_project_form] = useState(false)
    const dispatch = useDispatch()

    const show_add_experience = () => {
        dispatch(set_background_blur(true))
        set_project_form(true)
    }



    return (
        <>
            <div className={`${style2.outer_box} ${style.form} ${!project_form ? "" : style2.form_hid} `}>
                <div className={`${style2.form} `}>
                    <Project_form
                        set_project_form={set_project_form}
                        dispatch={dispatch}
                        set_background_blur={set_background_blur}

                    />
                </div>
            </div>

            <div className={style.education}>
                <div className={style.education}>
                    <div className={style.educatinal_details}>
                        <Project_comp
                            set_project_form={set_project_form}
                            profile={false}
                        />
                    </div>
                </div>

            </div>
        </>
    )

}

export default Emp_Project