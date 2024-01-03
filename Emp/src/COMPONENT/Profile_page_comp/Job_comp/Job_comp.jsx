import React from 'react'
import style from './Job_comp.module.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import style2 from '../Educ_comp/Educ_comp.module.css'
import {
    set_job_form_edit_data,
    set_job_form_data_delete
} from '../../../REDUX/REDUCER/Emp_reducer'
import { useDeleteJobDataMutation } from '../../../REDUX/Api/Sending_data_api'
import { set_React_loader } from '../../../REDUX/REDUCER/Other_reducer';
import { getMonthName } from '../../../HELPER_FUNCTION/Normal_function';
const Job_comp = ({ set_job_form, set_background_blur, profile }) => {

    const dispatch = useDispatch()

    const [deleteJobData] = useDeleteJobDataMutation()

    const data = useSelector(state => state.Reducer1)// getting user data
    const job_form_data = data.job_form_data //job detail

    const add_fn = () => {
        set_job_form(true)
        dispatch(set_background_blur(true))
    }

    const del_fn = async (value) => {

        if (profile) {
            try {
                dispatch(set_React_loader(true))
                const res = await deleteJobData(value.key)
                dispatch(set_React_loader(false))


                if (res.data) {
                    toast.success(res.data.val)
                    dispatch(set_job_form_data_delete(value.key))

                }
                if (res.error) {
                    toast.error(res.error.data.val)
                }


            } catch (error) {
                dispatch(set_React_loader(false))
                toast.error('Something went wrong')

            }
        } else {
            try {
                dispatch(set_job_form_data_delete(value.key))
            } catch (error) {
                console.log(error)
            }
        }
    }

    const edit_fn = (value) => {
        (set_job_form(true))
        dispatch(set_job_form_edit_data(value))

    }

    return (
        <div>

            <div className={style.work}>
                <div className={style2.outer}>
                    <h3 className={style2.main_head}>Work Experience</h3>
                    <div className={style2.add}>

                        <button onClick={() => { add_fn() }} ><b>+ Work Experience</b></button>

                    </div>
                </div>
                {
                    job_form_data ? job_form_data.map((value, index) => {
                        return (
                            <div key={index} className={style2.education}>
                                <p className={style2.btn_box}>
                                    <b>{value.Profile?value.Profile.charAt(0).toUpperCase() + value.Profile.slice(1).toLowerCase():''}</b>
                                    <div>
                                        <div className={style2.edit_btn} onClick={() => { edit_fn(value) }}><b><i class="bi bi-pencil-square"></i></b></div>
                                        <div className={style2.del_btn} onClick={() => { del_fn(value) }}><b><i class="bi bi-trash"></i></b></div>
                                    </div>
                                </p>
                                <p>{value.Organisation.toUpperCase()}, {value.Job_type}</p>
                                <p>{getMonthName(value.Start_Date)}  -  {value.Currently_Working ? 'Present' : getMonthName(value.End_Date)}</p>
                                <p>( {value.Job_title} )</p>
                                <br />

                            </div>
                        )
                    }) : ''
                }


            </div>
        </div>
    )
}

export default Job_comp