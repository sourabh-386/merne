import React, { useEffect } from 'react'
import style from './Job_form.module.css'
import style2 from '../../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import btn_style from '../Education_option/Education_op.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
    set_job_form_data,
    update_job_form_data,
    set_job_form_edit_data,
} from '../../../REDUX/REDUCER/Emp_reducer'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSendJobDataMutation } from '../../../REDUX/Api/Sending_data_api.js'
import { Submit_job } from '../../../HELPER_FUNCTION/Profile_helper/Job_fn'
import { set_React_loader } from '../../../REDUX/REDUCER/Other_reducer'

const Job_form = ({ set_job_form, set_background_blur, dispatch, profile }) => {

    const [sendJobData] = useSendJobDataMutation()

    // const dispatch = useDispatch()
    const form_edit_data = useSelector(state => state.Reducer1.edit_job_form_data, profile)


    //close form window

    const close_form_window = (e) => {
        set_job_form(false)
        dispatch(set_background_blur(false))
        dispatch(set_job_form_edit_data(''))

    }


    //yup validation
    const valid = Yup.object({
        Job_title: Yup.string()
            .required('This field is required'),
        Job_type: Yup.string()
            .required('This field is required'),
        Designation: Yup.string()
            .trim()
            .min(4, 'Enter valid Name')
            .max(40, 'exceed the max length')
            .required('This field is required'),
        Profile: Yup.string()
            .trim()
            .min(4, 'Enter valid Name')
            .max(40, 'exceed the max length')
            .required('This field is required'),
        Organisation: Yup.string()
            .trim()
            .min(4, 'Enter valid Name')
            .max(40, 'exceed the max length')
            .required('This field is required'),
        Location: Yup.string()
            .trim()
            .min(4, 'Enter valid Name')
            .max(40, 'exceed the max length')
            .required('This field is required'),
        Start_Date: Yup.date()
            .required('This field is required'),
        Currently_Working: Yup.boolean(),
        End_Date: Yup.date()
            .when("Ongoing", {
                is: false,
                then: (data) => data.required('This field is required'),
            }),
        Role_Description: Yup.string()
            .trim()
            .min(2, 'Enter valid Name')
            .max(200, 'exceed the max length')
            .required('This field is required')

    })

    //value initilization
    const [initialValues, set_initialValues] = useState(
        {
            Job_title: '',
            Job_type: '',
            Designation: '',
            Profile: '',
            Organisation: '',
            Location: '',
            Start_Date: '',
            End_Date: '',
            Currently_Working: '',
            Role_Description: '',
            key: ''
        }
    )

    // console.log(initialValues)

    //this will help in set edit value to form
    useEffect(() => {
        if (form_edit_data) {
            set_initialValues(form_edit_data)
            // console.log('new')
        }
        else {
            set_initialValues(
                {
                    Job_title: '',
                    Job_type: '',
                    Designation: '',
                    Profile: '',
                    Organisation: '',
                    Location: '',
                    Start_Date: '',
                    End_Date: '',
                    Currently_Working: '',
                    Role_Description: '',
                    key: ''
                }
            )
            // console.log('old')

        }


    }, [form_edit_data])

    //formik
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            const time = new Date().getTime() // setting a unique key

            if (values.Currently_Working) { //seting end_date value on currently working status
                setFieldValue('End_Date', '')
            }

            if (form_edit_data) {

                const edit = true
                if (profile) {
                    Submit_job(sendJobData, value, dispatch, set_React_loader, toast, set_job_form_edit_data, update_job_form_data, set_job_form_data, edit)
                }
                else {
                    dispatch(update_job_form_data(value))
                    dispatch(set_job_form_edit_data(''))
                }

            }
            else {
                const edit = false
                value = { ...value, key: time }
                if (profile) {
                    Submit_job(sendJobData, value, dispatch, set_React_loader, toast, set_job_form_edit_data, update_job_form_data, set_job_form_data, edit)
                }
                else {
                    dispatch(set_job_form_data(value))
                }


            }


            set_job_form(false)
            dispatch(set_background_blur(false))
            resetForm()


        },
    })

    console.log(initialValues, values)
    //onchange even handler
    const onchange_event = (e) => {
        handleChange(e)
    }

    //const toggle end date input
    const [end_date, set_end_date] = useState(false)
    const end_date_toggle = () => {
        // set
    }


    return (
        <div className={style.job_form_outside}>
            <div className={style.job_form}>
                <center><h4>Job Details</h4></center>
                <form className={style.main_box} onSubmit={handleSubmit}>
                    <div
                        className={`${style.ed_box} ${style.ed_box6}`}
                    >
                        <label htmlFor="">Job title <b className={style2.star}>**</b></label>
                        <select id=""
                            className={style2.input_fields}
                            onChange={(e) => onchange_event(e)}
                            name='Job_title'
                            value={values.Job_title}

                        >
                            <option value="">Select</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Internship">Internship</option>
                        </select>
                        {errors.Job_title && touched.Job_title ? <p className={btn_style.error_div}>{errors.Job_title}</p> : null}

                    </div>
                    <div
                        className={`${style.ed_box} ${style.ed_box7}`}
                    >
                        <label htmlFor="">Job Type <b className={style2.star}>**</b></label>
                        <select id=""
                            className={style2.input_fields}
                            onChange={(e) => onchange_event(e)}
                            name='Job_type'
                            value={values.Job_type}

                        >
                            <option value="">Select</option>
                            <option value="Work from Home">Work from Home</option>
                            <option value="Office">Office</option>
                        </select>
                        {errors.Job_type && touched.Job_type ? <p className={btn_style.error_div}>{errors.Job_type}</p> : null}

                    </div>
                    <div
                        className={`${style.ed_box} ${style.ed_box2}`}
                    >
                        <label htmlFor="">Designation <b className={style2.star}>**</b></label>
                        <input type="text"
                            className={style2.input_fields}
                            onChange={(e) => onchange_event(e)}
                            name="Designation"
                            value={values.Designation}
                        />
                        {errors.Designation && touched.Designation ? <p className={btn_style.error_div}>{errors.Designation}</p> : null}

                    </div>
                    <div
                        className={`${style.ed_box} ${style.ed_box3}`}
                    >
                        <label htmlFor="">Profile <b className={style2.star}>**</b></label>
                        <input type="text"
                            onChange={(e) => onchange_event(e)}
                            name='Profile'
                            className={style2.input_fields}
                            value={values.Profile}
                        />
                        {errors.Profile && touched.Profile ? <p className={btn_style.error_div}>{errors.Profile}</p> : null}

                    </div>
                    <div
                        className={`${style.ed_box} ${style.ed_box4}`}
                    >
                        <label htmlFor="">Organisation <b className={style2.star}>**</b></label>
                        <input type="text"
                            className={style2.input_fields}
                            onChange={(e) => onchange_event(e)}
                            name='Organisation'
                            value={values.Organisation}

                        />
                        {errors.Organisation && touched.Organisation ? <p className={btn_style.error_div}>{errors.Organisation}</p> : null}

                    </div>
                    <div
                        className={`${style.ed_box} ${style.ed_box5}`}
                    >
                        <label htmlFor="">Location <b className={style2.star}>**</b></label>
                        <input type="text"
                            className={style2.input_fields}
                            onChange={(e) => onchange_event(e)}
                            name="Location"
                            value={values.Location}

                        />
                        {errors.Location && touched.Location ? <p className={btn_style.error_div}>{errors.Location}</p> : null}

                    </div>
                    <div
                        className={`${style.ed_box} ${style.ed_box6}`}
                    >
                        <label htmlFor="">Start Month <b className={style2.star}>**</b></label>
                        <input type="date"
                            className={style2.input_fields}
                            onChange={(e) => onchange_event(e)}
                            name='Start_Date'
                            value={values.Start_Date}

                        />
                        {errors.Start_Date && touched.Start_Date ? <p className={btn_style.error_div}>{errors.Start_Date}</p> : null}

                    </div>
                    <div
                        className={`${style.ed_box} ${style.ed_box7}`}
                    >
                        <label htmlFor="">End Month <b className={style2.star}>**</b></label>
                        <input type="date"
                            className={style2.input_fields}
                            onChange={(e) => onchange_event(e)}
                            name='End_Date'
                            value={values.End_Date}
                            disabled={values.Currently_Working}
                        />
                        {errors.End_Date && touched.End_Date ? <p className={btn_style.error_div}>{errors.End_Date}</p> : null}

                    </div>
                    <div
                        className={`${style.ed_box} ${style.ed_box7} ${style.checkbox}`}
                    >
                        <input type="checkbox" name="Currently_Working" id=""
                            onChange={(e) => onchange_event(e)}
                            value={values.Currently_Working}
                            onClick={() => { set_end_date(!end_date) }}
                            checked={values.Currently_Working}

                        />
                        <label htmlFor="">Currently Working</label>
                    </div>
                    <div className={`${style.ed_box} ${style.textarea}`}>
                        <textarea
                            className={style2.input_fields}
                            name="Role_Description" id="" cols="50" rows="10"
                            placeholder='Role Description'
                            onChange={(e) => onchange_event(e)}
                            value={values.Role_Description}
                        />
                        {errors.Role_Description && touched.Role_Description ? <p className={btn_style.error_div}>{errors.Role_Description}</p> : null}

                    </div>
                    <div
                        className={`${style.ed_box} ${style.btn_box} `}
                    >
                        <button

                            className={btn_style.btn}
                            type='submit'
                        >Submit
                        </button>
                    </div>


                </form>

                <div className={btn_style.close_icon}

                >
                    <b
                        onClick={(e) => { close_form_window(e) }}
                    ><i class="bi bi-x-lg"></i></b>
                </div>

            </div>
        </div>
    )
}

export default Job_form