import React, { useState } from 'react'
import style from './Education_op.module.css'
// import { close_education_op } from '../../../HELPER_FUNCTION/Emp_helper'
// import { Dispatch } from 'react'
import { set_education_option_page } from '../../../REDUX/REDUCER/Emp_reducer'
import { useDispatch } from 'react-redux'
import { set_background_blur } from '../../../REDUX/REDUCER/Emp_reducer'
import style2 from '../../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { close_education_op } from '../../../HELPER_FUNCTION/Emp_helper'
import { set_education_option_page2 } from '../../../REDUX/REDUCER/Emp_reducer'

const Education_op2 = ({ heading, set, close, set_detail,study }) => {

    const dispatch = useDispatch()

    //yup validation
    const valid = Yup.object({
        Collage: Yup.string()
            .trim()
            .min(10, 'Enter valid Name')
            .max(40, 'exceed the max length')
            .required('This field is required'),
        Degree: Yup.string()
            .trim()
            .min(2, 'Enter valid Name')
            .max(40, 'exceed the max length')
            .required('This field is required'),
        Stream: Yup.string()
            .trim()
            .min(2, 'Enter valid Name')
            .max(40, 'exceed the max length')
            .required('This field is required'),
        Start_date: Yup.date()
            .required('This field is required'),
        End_date: Yup.date()
            .required('This field is required'),
        Percentage: Yup.number()
            .min(0, 'Invalid')
            .max(100, 'Invalid')


    })

    //value initilization
    const initialValues = {
        Collage: '',
        Degree: '',
        Stream: '',
        Start_date: '',
        End_date: '',
        Percentage: '',
        Study:study
    }



    //formik
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            const time = new Date().getTime()
            // console.log(value)

            console.log(value)
            dispatch(set_detail({...value,key: time }))
            close(dispatch, set, set_background_blur)
            resetForm()

        },
    })

    //onchange even handler

    const onchange_event = (e) => {
        handleChange(e)
    }


 

    return (
        <>
            <div className={style.education_op}>
                <center><h4>{heading}</h4></center>
                <br />
                <form className={style.ed_form} onSubmit={handleSubmit}>
                    <div className={`${style.ed_box} ${style.ed_box1}`}>
                        <label htmlFor="" className={style2.input_label}>College <b className={style2.star}>**</b></label>
                        <input
                            type="text"
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.Collage}
                            name='Collage'

                        />
                        {errors.Collage && touched.Collage ? <p className={style.error_div}>{errors.Collage}</p> : null}

                    </div>
                    <div className={`${style.ed_box} ${style.ed_box3}`}>
                        <label htmlFor="" className={style2.input_label}>Degree <b className={style2.star}>**</b></label>
                        <input
                            type="text"
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.Degree}
                            name='Degree'
                        />
                        {errors.Degree && touched.Degree ? <p className={style.error_div}>{errors.Degree}</p> : null}

                    </div>
                    <div className={`${style.ed_box} ${style.ed_box4}`}>
                        <label htmlFor="" className={style2.input_label}>Stream <b className={style2.star}>**</b></label>
                        <input
                            type="text"
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.Stream}
                            name='Stream'

                        />
                        {errors.Stream && touched.Stream ? <p className={style.error_div}>{errors.Stream}</p> : null}

                    </div>
                    <div className={`${style.ed_box} ${style.ed_box3}`}>
                        <label htmlFor="" className={style2.input_label}>Start Date <b className={style2.star}>**</b></label>
                        <input
                            type="Date"
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.Start_date}
                            name='Start_date'


                        />
                        {errors.Start_date && touched.Start_date ? <p className={style.error_div}>{errors.Start_date}</p> : null}

                    </div>
                    <div className={`${style.ed_box} ${style.ed_box4}`}>
                        <label htmlFor="" className={style2.input_label}>End Date <b className={style2.star}>**</b></label>
                        <input
                            type="Date"
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.End_date}
                            name='End_date'

                        />
                        {errors.End_date && touched.End_date ? <p className={style.error_div}>{errors.End_date}</p> : null}

                    </div>
                    <div className={`${style.ed_box} ${style.ed_box5}`}>
                        <label htmlFor="" className={style2.input_label}>Percentage <b className={style2.star}>**</b></label>
                        <input
                            type="number"
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.Percentage}
                            name='Percentage'

                        />
                        {errors.Percentage && touched.Percentage ? <p className={style.error_div}>{errors.Percentage}</p> : null}

                    </div>
                    <div className={`${style.ed_box} ${style.ed_box6}`}>
                        <button
                            className={style.btn}
                        >
                            <b>Submit</b>
                        </button>
                    </div>
                </form>

                <div className={style.close_icon}
                    onClick={() => { close(dispatch, set, set_background_blur) }}

                >
                    <b><i class="bi bi-x-lg"></i></b>
                </div>
            </div>
            {/* <Emp_details/> */}
        </>
    )
}

export default Education_op2