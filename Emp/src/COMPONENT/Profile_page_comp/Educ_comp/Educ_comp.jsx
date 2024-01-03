import React from 'react'
import style from './Educ_comp.module.css'
import { useDispatch, useSelector } from 'react-redux'
import Education_options from './Education_options/Education_options'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
    set_education_form_edit_data,
    set_education_form_data_delete
} from '../../../REDUX/REDUCER/Emp_reducer'
import { set_React_loader } from '../../../REDUX/REDUCER/Other_reducer'
import { useDeleteEducationDataMutation } from '../../../REDUX/Api/Sending_data_api';

const Educ_comp = ({ set_design_data, set_education_form, profile }) => {

    const dispatch = useDispatch()

    const [deleteEducationData] = useDeleteEducationDataMutation()


    const data = useSelector(state => state.Reducer1)// getting user data
    const education = data.education_form_data


    const del_fn = async (value) => {

        if (profile) {
            try {
                dispatch(set_React_loader(true))
                const res = await deleteEducationData(value.id)
                dispatch(set_React_loader(false))

                console.log('dddd1')

                if (res.data) {
                    toast.success(res.data.val)
                    dispatch(set_education_form_data_delete(value.id))

                }
                if (res.error) {
                    toast.error(res.error.data.val)
                }


            } catch (error) {
                // console.log(error)
                dispatch(set_React_loader(false))
                toast.error('Something went wrong')

            }
        }
        else {
            try {
                // console.log('dddd')
                dispatch(set_education_form_data_delete(value.id))
            } catch (error) {
                toast.error('Something went wrong')

            }

        }
    }

    const edit_fn = (value) => {
        (set_education_form(true))
        dispatch(set_education_form_edit_data(value))

    }

    return (
        <div className={style.education}>

            <div className={style.outer}>
                <h3 className={style.main_head}>Education</h3>
                <div className={style.add}>
                    <Education_options
                        set_design_data={set_design_data}
                        set_education_form={set_education_form}
                    />
                </div>
            </div>
            {
                profile ? "" : <br />
            }

            {
                education.length !== 0 ?
                    education.map((val, index) => {

                        if (val.Study == 'Secondory (X)' || val.Study == 'Senior Secondry (XII)') {
                            return (
                                <div>
                                    <p className={style.btn_box}>
                                        <b> {val.Study}</b>
                                        <div>
                                            <div className={style.edit_btn} onClick={() => { edit_fn(val) }}><b><i class="bi bi-pencil-square"></i></b></div>
                                            <div className={style.del_btn} onClick={() => { del_fn(val) }}><b><i class="bi bi-trash"></i></b></div>
                                        </div>
                                    </p>
                                    <p>{val.Collage_School.toUpperCase()} , {val.Board.toUpperCase()} </p>
                                    <p>Completion Year : {val.End_date?val.End_date.slice(0, 4):''}</p>
                                    {val.Percentage ? <p>Percentage : {val.Percentage} %</p> : ''}

                                    <br />
                                </div>
                            )
                        }
                        else {
                            return (
                                <div key={index} className={style.data}>
                                    <p className={style.btn_box}>
                                        <b>
                                            {val.Degree?val.Degree.charAt(0).toUpperCase() + val.Degree.slice(1).toLowerCase():''},  
                                            {val.Stream?val.Stream.charAt(0).toUpperCase() + val.Stream.slice(1).toLowerCase():''},  ({val.Study})</b>
                                        <div>
                                            <div className={style.edit_btn} onClick={() => { edit_fn(val) }}><b><i class="bi bi-pencil-square"></i></b></div>
                                            <div className={style.del_btn} onClick={() => { del_fn(val) }}><b><i class="bi bi-trash"></i></b></div>
                                        </div>
                                    </p>
                                    <p>{val.Collage_School.toUpperCase()}</p>
                                    <p>{val.Start_date?val.Start_date.slice(0, 4):''} - {val.End_date?val.End_date.slice(0, 4):''}</p>
                                    {
                                        val.Percentage ?

                                            <p> Percentage : {val.Percentage}%</p> : ''
                                    }
                                    <br />
                                </div>
                            )
                        }
                    })
                    : ''

            }


        </div>
    )
}

export default Educ_comp