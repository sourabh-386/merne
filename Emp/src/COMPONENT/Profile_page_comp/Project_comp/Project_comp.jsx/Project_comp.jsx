import React from 'react'
import style2 from '../../Educ_comp/Educ_comp.module.css'
import { useSelector, useDispatch } from 'react-redux'
import btn_style from '../../../EMP_DETAILS_COMP/Education_option/Education_op.module.css'
import {
    set_project_form_data,
    update_project_form_data,
    set_project_form_edit_data,
    set_project_form_data_delete
} from '../../../../REDUX/REDUCER/Emp_reducer'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { set_React_loader } from '../../../../REDUX/REDUCER/Other_reducer'
import { useDeleteProjectDataMutation } from '../../../../REDUX/Api/Sending_data_api'
import { getMonthName } from '../../../../HELPER_FUNCTION/Normal_function'

const Project_comp = ({ set_project_form, set_background_blur, profile }) => {

    const dispatch = useDispatch()
    const [deleteProjectData] = useDeleteProjectDataMutation()

    const project_form_data = useSelector(state => state.Reducer1.project_form_data)

    const edit_fn = (value) => {
        dispatch(set_project_form_edit_data(value))
        set_project_form(true)
    }

    const del_fn = async (value) => {

        if (profile) {
            try {
                dispatch(set_React_loader(true))
                const res = await deleteProjectData(value.id)
                dispatch(set_React_loader(false))


                if (res.data) {
                    toast.success(res.data.val)
                    dispatch(set_project_form_data_delete(value.id))

                }
                if (res.error) {
                    toast.error(res.error.data.val)
                }


            } catch (error) {
                dispatch(set_React_loader(false))
                toast.error('Something went wrong')

            }
        }
        else {
            try {
                // console.log('dddd')
                dispatch(set_project_form_data_delete(value.id))
            } catch (error) {
                toast.error('Something went wrong')
            }
        }

    }

    const add_fn = () => {

        set_project_form(true)
    }

    return (
        <div className={style2.education} >
            <div className={style2.outer}>
                <h3 className={style2.main_head}>Projects</h3>
                <div className={style2.add}>

                    <button onClick={() => { add_fn() }} ><b>+ Projects</b></button>

                </div>
            </div>

            {
                project_form_data.length > 0 ?
                    project_form_data.map(value => {
                        return (
                            <div>
                                <p className={style2.btn_box}>
                                    <b>{value.Project_name ? value.Project_name.charAt(0).toUpperCase() + value.Project_name.slice(1).toLowerCase() : ''}</b>
                                    <div>
                                        <div className={style2.edit_btn} onClick={() => { edit_fn(value) }}><b><i class="bi bi-pencil-square"></i></b></div>
                                        <div className={style2.del_btn} onClick={() => { del_fn(value) }}><b><i class="bi bi-trash"></i></b></div>
                                    </div>
                                </p>

                                <p>{getMonthName(value.Start_Date)} - {value.Ongoing ? 'Present' : getMonthName(value.End_Date)}</p>

                                <p><a href={value.Project_link ? value.Project_link : ''}>{value.Project_link ? value.Project_link : ''}</a></p>

                                <br />

                            </div>

                        )
                    })
                    : ''

            }


        </div>
    )
}

export default Project_comp