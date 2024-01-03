import { React, useState } from 'react'
import style from './Education_options.module.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { set_background_blur } from '../../../../REDUX/REDUCER/Emp_reducer'

const Education_options = ({ set_design_data, set_education_form }) => {

    // set education form values 
    const graduation = { heading: 'Graduation/ Post graduation', prime: false }
    const diploma = { heading: 'Diploma', prime: false }
    const phd = { heading: 'Phd', prime: false }
    const tenth = { heading: 'Secondory (X)', prime: true }
    const twelth = { heading: 'Senior Secondry (XII)', prime: true }

    const [vis, set_vis] = useState(false)

    const dispatch = useDispatch()

    const data = useSelector(state => state.Reducer1.set_education_form_data)

    const click_fn = (data) => {
        dispatch(set_background_blur(true))
        set_design_data(data)
        set_education_form(true)
    }


    return (
        <div className={style.btn_box}>

            <button
                className={style.add_education}
                onMouseEnter={() => { set_vis(true) }}
                onMouseLeave={() => { set_vis(false) }}
            >
                <b>+ Education</b></button>

            <div className={`${style.course} ${vis ? "" : style.course_hid}`} >

                <div className={style.course_inside}
                    onMouseEnter={() => { set_vis(true) }}
                    onMouseLeave={() => { set_vis(false) }}
                >
                    <b onClick={() => { click_fn(graduation) }}>+ Graduation/ Post graduation</b>
                    <b onClick={() => { click_fn(twelth) }}>+ Senior Secondry (XII)</b>
                    <b onClick={() => { click_fn(tenth) }}>+ Secondory (X)</b>
                    <b onClick={() => { click_fn(diploma) }}>+ Diploma</b>
                    <b onClick={() => { click_fn(phd) }}>+ Phd</b>

                </div>
            </div>
        </div>
    )
}

export default Education_options