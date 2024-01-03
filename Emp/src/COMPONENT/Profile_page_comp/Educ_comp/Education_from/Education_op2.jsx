import React, { useState, useEffect } from 'react'
import style from './Education_op.module.css'
import { useDispatch, useSelector } from 'react-redux'
import style2 from '../../../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
    set_education_form_data,
    update_education_form_data,
    set_education_form_edit_data,
} from '../../../../REDUX/REDUCER/Emp_reducer'
import { useSendEducationDataMutation } from '../../../../REDUX/Api/Sending_data_api'
import { Submit_education } from '../../../../HELPER_FUNCTION/Profile_helper/Education_fn'
import { set_React_loader } from '../../../../REDUX/REDUCER/Other_reducer'


const Education_op2 = ({ set_education_form, set_background_blur, dispatch, design_data, profile }) => {

    const education_edit_data = useSelector(state => state.Reducer1.edit_education_form_data)
    const [sendeducationData] = useSendEducationDataMutation()

    //close form window
    const close = (e) => {
        set_education_form(false)
        dispatch(set_background_blur(false))
        dispatch(set_education_form_edit_data(''))
    }

    const valid = Yup.object({
        Collage_School: Yup.string()
            .trim()
            .min(5, 'Enter valid Name')
            .max(100, 'exceed the max length')
            .required('This field is required'),
        Board: Yup.string()
            .trim()
            .min(2, 'Enter valid Name')
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
        City: Yup.string()
            .trim()
            .min(2, 'Enter valid Name')
            .max(40, 'exceed the max length'),
        Start_date: Yup.string()
            .required('This field is required'),
        End_date: Yup.date()
            .required('This field is required'),
        Percentage: Yup.number()
            .min(0, 'Invalid')
            .max(100, 'Invalid')

    })

    //value initilization
    const [initialValues, set_initialValues] = useState([])

    //this will help in set edit value to form
    useEffect(() => {
        if (education_edit_data) {

            set_initialValues(education_edit_data)
        }
        else {

            set_initialValues(
                {
                    Collage_School: '',
                    Degree: design_data.prime ? "not aplicable" : '',
                    Stream: design_data.prime ? "not aplicable" : '',
                    Board: design_data.prime ? "" : "not aplicable",
                    Start_date: design_data.prime ? "not aplicable" : '',
                    End_date: '',
                    Percentage: '',
                    Study: design_data.heading,
                    City: '',
                    id: ''
                }
            )
        }
    }, [education_edit_data, design_data.prime])


    // console.log('profile', profile)
    //formik
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            const time = new Date().getTime() // setting a unique key



            if (education_edit_data) {

                const edit = true
                if (profile) {
                    Submit_education(sendeducationData, value, dispatch, set_React_loader, toast, set_education_form_edit_data, update_education_form_data, set_education_form_data, edit)
                }
                else {
                    dispatch(update_education_form_data(value))
                }

            }
            else {
                const edit = false
                value = { ...value, id: time, Study: design_data.heading }
                if (profile) {
                    Submit_education(sendeducationData, value, dispatch, set_React_loader, toast, set_education_form_edit_data, update_education_form_data, set_education_form_data, edit)
                }
                else {
                    // console.log('ss')
                    dispatch(set_education_form_data(value))

                }
            }


            set_education_form(false)
            dispatch(set_background_blur(false))
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
                <center><h3>{design_data.heading}</h3></center>
                <br />
                <form className={style.ed_form} onSubmit={handleSubmit}>
                    <div className={`${style.ed_box} ${style.ed_box1}`}>
                        <label htmlFor="" className={style2.input_label}>College/ School <b className={style2.star}>**</b></label>
                        <input
                            type="text"
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.Collage_School}
                            name='Collage_School'

                        />
                        {errors.Collage_School && touched.Collage_School ? <p className={style.error_div}>{errors.Collage_School}</p> : null}

                    </div>
                    {
                        !design_data.prime ?
                            <>
                                <div className={`${style.ed_box} ${style.ed_box3}`}>
                                    <label htmlFor="" className={`${style2.input_label} `}>Degree <b className={style2.star}>**</b></label>
                                    <input
                                        type="text"
                                        className={`${style2.input_fields} `}
                                        onChange={(e) => { onchange_event(e) }}
                                        value={values.Degree}
                                        name='Degree'
                                        disabled={design_data.prime}

                                    />
                                    {errors.Degree && touched.Degree ? <p className={style.error_div}>{errors.Degree}</p> : null}

                                </div>
                                <div className={`${style.ed_box} ${style.ed_box4}`}>
                                    <label htmlFor="" className={style2.input_label}>Stream <b className={style2.star}>**</b></label>
                                    <input
                                        type="text"
                                        className={`${style2.input_fields} `}
                                        onChange={(e) => { onchange_event(e) }}
                                        value={values.Stream}
                                        name='Stream'
                                        disabled={design_data.prime}

                                    />
                                    {errors.Stream && touched.Stream ? <p className={style.error_div}>{errors.Stream}</p> : null}

                                </div>
                            </>
                            :
                            <div className={`${style.ed_box} ${style.ed_box1}`}>
                                <label htmlFor="" className={style2.input_label}>Board<b className={style2.star}>**</b></label>
                                <input
                                    type="text"
                                    className={`${style2.input_fields} ${!design_data.prime ? style.invalid_input : ''}`}
                                    onChange={(e) => { onchange_event(e) }}
                                    value={values.Board}
                                    name='Board'
                                    disabled={!design_data.prime}

                                />
                                {errors.Board && touched.Board ? <p className={style.error_div}>{errors.Board}</p> : null}

                            </div>
                    }


                    <div className={`${style.ed_box} ${style.ed_box3}`}>
                        <label htmlFor="" className={style2.input_label}>Starting year <b className={style2.star}>**</b></label>
                        <input
                            type="Date"
                            className={`${style2.input_fields} ${design_data.prime ? style.invalid_input : ''}`}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.Start_date}
                            name='Start_date'
                            disabled={design_data.prime}

                        />
                        {errors.Start_date && touched.Start_date ? <p className={style.error_div}>{errors.Start_date}</p> : null}

                    </div>
                    <div className={`${style.ed_box} ${style.ed_box4}`}>
                        <label htmlFor="" className={style2.input_label}>Ending year <b className={style2.star}>**</b></label>
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
                        <label htmlFor="" className={style2.input_label}>City</label>
                        <input
                            type="text"
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.City}
                            name='City'
                        />
                        {errors.City && touched.City ? <p className={style.error_div}>{errors.City}</p> : null}

                    </div>
                    <div className={`${style.ed_box} ${style.ed_box5}`}>
                        <label htmlFor="" className={style2.input_label}>Percentage</label>
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
                            type='submit'
                        >
                            <b>Submit</b>
                        </button>
                    </div>
                </form>

                <div className={style.close_icon}
                    onClick={() => { close() }}

                >
                    <b><i class="bi bi-x-lg"></i></b>
                </div>
            </div>
        </>
    )
}

export default Education_op2