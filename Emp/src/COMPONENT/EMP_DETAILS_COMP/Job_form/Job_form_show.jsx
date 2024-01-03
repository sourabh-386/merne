import React from 'react'
import style from '../Education_show/Education_show.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { set_job_form_data_delete, set_job_form,set_job_form_edit_data } from '../../../REDUX/REDUCER/Emp_reducer'
import box from '../../../assets/box.png'

const Job_form_show = ({set_job_form}) => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.Reducer1.job_form_data)
    const form_vis = useSelector(state => state.Reducer1.job_form)

    // edit job form 
    const edit_job_form = (value) => {

        set_job_form(true)
        dispatch(set_job_form_edit_data(value))


        // console.log(value)
    }

    return (
        <>
            {
                data.length !== 0 ?

                    data.map((value, index) => {
                        return (
                            <div key={index} className={style.course_box}>
                                <h4 className={style.heading}>{value.Designation}</h4>
                                <p>{value.Organisation}, {value.Job_type}</p>
                                <p>{value.Start_Date.slice(0, 7)} - {value.Currently_Working ? <p>&nbsp;  Present</p> : value.End_Date.slice(0, 7)}</p>
                                <p>({value.Job_title})</p>
                                <div className={style.course_edit}>
                                    <i
                                        class="bi bi-pencil-square"
                                        onClick={() => { edit_job_form(value) }}

                                    ></i>
                                    <i
                                        class="bi bi-trash3-fill"
                                        onClick={() => { dispatch(set_job_form_data_delete(value.key)) }}
                                    ></i>
                                </div>
                            </div>
                        )
                    }) :

                    <div className={style.no_data_box}>
                        <img src={box} alt="#" />
                        <p>  Add Work Experience</p>
                    </div>




            }

        </>
    )
}

export default Job_form_show