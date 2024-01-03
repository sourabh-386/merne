import React from 'react'
import style from './Education_op.module.css'
import { close_education_op } from '../../../HELPER_FUNCTION/Emp_helper'
// import { Dispatch } from 'react'
import { set_education_option_page } from '../../../REDUX/REDUCER/Emp_reducer'
import { useDispatch } from 'react-redux'
import { set_background_blur } from '../../../REDUX/REDUCER/Emp_reducer'
import style2 from '../../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'


const Education_op = ({ heading, set, close, set_detail }) => {

    const dispatch = useDispatch()


    //yup validation
    const valid = Yup.object({
        School: Yup.string()
            .trim()
            .min(10, 'Enter valid Name')
            .max(40, 'exceed the max length')
            .required('This field is required'),
        Board: Yup.string()
            .trim()
            .min(2, 'Enter valid Name')
            .max(40, 'exceed the max length')
            .required('This field is required'),
        Comp_date: Yup.date()
            .required('This field is required'),
        Percentage: Yup.number()
            .min(0, 'Invalid')
            .max(100, 'Invalid'),
        City: Yup.string()
            .trim()
            .min(2, 'Enter valid Name')
            .max(20, 'exceed the max length')

    })

    //value initilization
    const initialValues = {
        School: '',
        Board: '',
        Comp_date: '',
        Percentage: '',
        City: '',
        Study:heading
    }

    //formik
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            console.log(value)
            dispatch(set_detail(value))
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
                        <label htmlFor="" className={style2.input_label}>School <b className={style2.star}>**</b></label>
                        <input
                            type="text"
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.School}
                            name='School'
                        />
                        {errors.School && touched.School ? <p className={style.error_div}>{errors.School}</p> : null}

                    </div>
                    <div className={`${style.ed_box} ${style.ed_box2}`}>
                        <label htmlFor="" className={style2.input_label}>Board<b className={style2.star}>**</b></label>
                        <input
                            type="text"
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.Board}
                            name='Board'
                        />
                        {errors.Board && touched.Board ? <p className={style.error_div}>{errors.Board}</p> : null}

                    </div>
                    <div className={`${style.ed_box} ${style.ed_box3}`}>
                        <label htmlFor="" className={style2.input_label}>Completion Year <b className={style2.star}>**</b></label>
                        <input
                            type="Date"
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.Comp_date}
                            name='Comp_date'
                        />
                        {errors.Comp_date && touched.Comp_date ? <p className={style.error_div}>{errors.Comp_date}</p> : null}

                    </div>
                    <div className={`${style.ed_box} ${style.ed_box4}`}>
                        <label htmlFor="" className={style2.input_label}>Percentage </label>
                        <input
                            type="number"
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.Percentage}
                            name='Percentage'
                        />
                        {errors.Percentage && touched.Percentage ? <p className={style.error_div}>{errors.Percentage}</p> : null}

                    </div>
                    <div className={`${style.ed_box} ${style.ed_box5}`}>
                        <label htmlFor="" className={style2.input_label}>City </label>
                        <input
                            type="text"
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.City}
                            name='City'
                        />
                        {errors.City && touched.City ? <p className={style.error_div}>{errors.City}</p> : null}

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
                    onClick={() => {
                        close(dispatch, set, set_background_blur)
                    }}
                >
                    <b><i class="bi bi-x-lg"></i></b>
                </div>
            </div>
            {/* <Emp_details/> */}
        </>
    )
}

export default Education_op