import React, { useRef, useState } from 'react'
import style from './Emp_education_detail.module.css'
import style2 from '../../PAGES/Profile/Profile.module.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import Educ_comp from '../../COMPONENT/Profile_page_comp/Educ_comp/Educ_comp'
import Education_op2 from '../../COMPONENT/Profile_page_comp/Educ_comp/Education_from/Education_op2'


import { set_background_blur } from '../../REDUX/REDUCER/Emp_reducer'

const Emp_education = () => {

    const [design_data, set_design_data] = useState({
        heading: '',
        prime: ''
    })

    const [education_form, set_education_form] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <div className={`${style2.outer_box} ${style.form} ${!education_form ? "" : style2.form_hid} `}>
                <div className={`${style2.form} `}>
                    <Education_op2
                        set_education_form={set_education_form}
                        dispatch={dispatch}
                        set_background_blur={set_background_blur}
                        design_data={design_data}
                    />
                </div>
            </div>

            <div className={style.education}>
                <div className={style.education}>
                    <div className={style.educatinal_details}>
                        <Educ_comp
                            set_design_data={set_design_data}
                            set_education_form={set_education_form}
                            profile={false}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Emp_education