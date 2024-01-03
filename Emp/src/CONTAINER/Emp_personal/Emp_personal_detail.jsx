import React from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { useMemo } from 'react'
import style from './Emp_personal_detail.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { set_personal_detail } from '../../REDUX/REDUCER/Emp_reducer'
import { set_page_val } from '../../REDUX/REDUCER/Emp_reducer'
import style2 from '../../COMPONENT/Profile_page_comp/Educ_comp/Educ_comp.module.css'
import btn_style from '../../COMPONENT/EMP_DETAILS_COMP/Education_option/Education_op.module.css'
import { useSendDataMutation } from '../../REDUX/Api/Sending_data_api.js'
import { Submit_personal } from '../../HELPER_FUNCTION/Profile_helper/Personal_fn.js'
import { set_React_loader } from '../../REDUX/REDUCER/Other_reducer'


const Emp_personal_detail = ({ set_form, set_background_blur, profile }) => {


    const [sendData] = useSendDataMutation()

    //option for country list
    const options = useMemo(() => countryList().getData(), [])
    


    const dispatch = useDispatch()

    const form_data = useSelector(state => state.Reducer1.Personal_detail)

    const page = useSelector((state) => state.Reducer1.page)


    // getting prefilled data 
    const prefilled = useSelector((state) => state.Reducer2.create_account_details)
    // formik start

    const [initialValues, set_initialValues] = useState({
        First_Name: prefilled[4].First_name ? prefilled[4].First_name : form_data ? form_data.First_Name : '',
        Middle_Name: form_data ? form_data.Middle_Name : '',
        Last_Name: prefilled[5].Last_name ? prefilled[5].Last_Name : form_data ? form_data.Last_Name : '',
        DOB: form_data ? form_data.DOB : '',
        Gender: form_data ? form_data.Gender : '',
        Email: prefilled[7].Email ? prefilled[7].Email : form_data ? form_data.Email : '',
        Phone: form_data ? form_data.Phone : '',
        Address1: form_data ? form_data.Address1 : '',
        Address2: form_data ? form_data.Address2 : '',
        State: form_data ? form_data.State : '',
        City: form_data ? form_data.City : "",
        Pin_Code: form_data ? form_data.Pin_Code : ''
    }
    )



    const valid = Yup.object({
        First_Name: Yup.string()
            .trim()
            .min(2, 'Enter valid Name')
            .max(20, 'exceed the max length')
            .required('This field is required'),
        Middle_Name: Yup.string()
            .trim()
            .min(2, 'Enter valid Name')
            .max(20, 'exceed the max length'),
        Last_Name: Yup.string()
            .trim()
            .min(2, 'Enter valid Name')
            .max(20, 'exceed the max length'),
        DOB: Yup.date()
            .required('This field is required'),
        Gender: Yup.string()
            .required('This field is required'),
        Email: Yup.string()
            .email('Invalid email address')
            .required('This field is required'),
        Phone: Yup.string()
            .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Invalid phone number')
            .required('This field is required'),
        Address1: Yup.string()
            .trim()
            .min(10, 'Enter valid Name')
            .max(40, 'exceed the max length')
            .required('This field is required'),
        Address2: Yup.string()
            .trim()
            .min(10, 'Enter valid Name')
            .max(40, 'exceed the max length'),
        Country: Yup.object()
            .required('This field is required'),
        State: Yup.string()
            .trim()
            .min(2, 'Enter valid Name')
            .max(20, 'exceed the max length')
            .required('This field is required'),
        City: Yup.string()
            .trim()
            .min(2, 'Enter valid Name')
            .max(20, 'exceed the max length')
            .required('This field is required'),
        Pin_Code: Yup.number()
            .required('This field is required')
    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: valid,
        onSubmit: async (value) => {

            // dispatch(set_personal_detail(value))
            if (profile) {
                await Submit_personal(sendData, value, dispatch, set_React_loader, set_personal_detail, toast)
                set_form(false)
                dispatch(set_background_blur(false))
            }
            else {
                dispatch(set_personal_detail(value))
                dispatch(set_page_val(page + 1))
            }

        },

    })

    //onchange even handler
    const onchange_event = (e) => {
        handleChange(e)

    }
    //onblur even handler
    const onblur_event = (e) => {
        handleBlur(e)

    }

    const cross_fn = () => {
        dispatch(set_background_blur(false))
        set_form(false)
    }


    console.log(initialValues, form_data)
    return (
        <div className={style.education}>

            <center><h3 className={style2.main_head}>Personal Details</h3></center>
            <br />
            {/* <br /> */}

            <form className={style.education_table} onSubmit={handleSubmit} >
                <div className={style.input1} >
                    <label htmlFor="" className={style.input_label}>First Name <b className={style.star}>**</b></label>
                    <input
                        type="text"
                        className={style.input_fields}
                        name='First_Name'
                        value={values.First_Name}
                        onChange={(e) => { onchange_event(e) }}
                    />
                    {errors.First_Name && touched.First_Name ? <p className={style.error_div}>{errors.First_Name}</p> : null}
                </div>
                <div className={style.input2} >
                    <label htmlFor="" className={style.input_label}>Middle Name </label>
                    <input
                        type="text"
                        className={style.input_fields}
                        name='Middle_Name'
                        value={values.Middle_Name}
                        onChange={(e) => { onchange_event(e) }}

                    />
                    {errors.Middle_Name && touched.Middle_Name ? <p className={style.error_div}>{errors.Middle_Name}</p> : null}

                </div>
                <div className={style.input3} >
                    <label htmlFor="" className={style.input_label}>Last Name <b className={style.star}>**</b></label>
                    <input
                        type="text"
                        className={style.input_fields}
                        name='Last_Name'
                        value={values.Last_Name}
                        onChange={(e) => { onchange_event(e) }}
                    />
                    {errors.Last_Name && touched.Last_Name ? <p className={style.error_div}>{errors.Last_Name}</p> : null}

                </div>
                <div className={style.input4} >
                    <label htmlFor="" className={style.input_label}>DOB  <b className={style.star}>**</b></label>
                    <input
                        type="Date"
                        className={style.input_fields}
                        name='DOB'
                        value={values.DOB}
                        onChange={(e) => { onchange_event(e) }}
                    />
                    {errors.DOB && touched.DOB ? <p className={style.error_div}>{errors.DOB}</p> : null}


                </div>
                <div className={style.input5} >
                    <label htmlFor="" className={style.input_label}>Gender  <b className={style.star}>**</b></label>

                    <select id=""
                        className={style.input_fields}
                        name='Gender'
                        value={values.Gender}
                        onChange={(e) => { onchange_event(e) }}
                    >
                        <option value="" defaultChecked>Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.Gender && touched.Gender ? <p className={style.error_div}>{errors.Gender}</p> : null}

                </div>
                <div className={style.input6} >
                    <label htmlFor="" className={style.input_label}>Email <b className={style.star}>**</b></label>
                    <input
                        type="text"
                        className={style.input_fields}
                        name="Email"
                        value={values.Email}
                        onChange={(e) => { onchange_event(e) }}
                    />
                    {errors.Email && touched.Email ? <p className={style.error_div}>{errors.First_Name}</p> : null}

                </div>
                <div className={style.input7} >
                    <label htmlFor="" className={style.input_label}>Phone <b className={style.star}>**</b></label>
                    <div className={style.input_fields}>
                        <PhoneInput
                            placeholder="Enter phone number"
                            className={style.my_phone_input}
                            value={values.Phone}
                            onChange={(value, data, event, formattedValue) => {
                                setFieldValue('Phone', value)
                            }}
                            name="Phone"
                        />
                        {errors.Phone && touched.Phone ? <p className={style.error_div}>{errors.Phone}</p> : null}

                    </div>
                </div>
                <div className={style.input8}>
                    <div className={style.address_start}>
                        <b>Address : </b>
                    </div>
                </div>
                <div className={style.input9}>
                    <label htmlFor="" className={style.input_label}>Address Line 1  <b className={style.star}>**</b></label>
                    <input
                        type="text"
                        className={style.input_fields}
                        name="Address1"
                        value={values.Address1}
                        onChange={(e) => { onchange_event(e) }}
                    />
                    {errors.Address1 && touched.Address1 ? <p className={style.error_div}>{errors.Address1}</p> : null}

                </div>
                <div className={style.input10}>
                    <label htmlFor="" className={style.input_label}>Address Line 2  <b className={style.star}>**</b></label>
                    <input
                        type="text"
                        className={style.input_fields}
                        name="Address2"
                        value={values.Address2}
                        onChange={(e) => { onchange_event(e) }}

                    />
                    {errors.Address2 && touched.Address2 ? <p className={style.error_div}>{errors.Address2}</p> : null}

                </div>
                <div className={style.input11}>
                    <label htmlFor="" className={style.input_label}>Country <b className={style.star}>**</b></label>
                    <div
                    // className={style.input_fields}
                    >
                        <Select name="Country" id=""
                            className={style.country_input}
                            options={options}
                            value={values.Country}

                            onChange={(selectedOption) => {
                                setFieldValue('Country', selectedOption);
                            }}
                        />
                        {errors.Country && touched.Country ? <p className={style.error_div}>{errors.Country}</p> : null}

                    </div>
                </div>
                <div className={style.input12}>
                    <label htmlFor="" className={style.input_label}>State <b className={style.star}>**</b></label>
                    <input
                        type="text"
                        className={style.input_fields}
                        name='State'
                        value={values.State}
                        onChange={(e) => { onchange_event(e) }}
                    />
                    {errors.State && touched.State ? <p className={style.error_div}>{errors.State}</p> : null}

                </div>
                <div className={style.input13}>
                    <label htmlFor="" className={style.input_label}>City <b className={style.star}>**</b></label>
                    <input
                        type="text"
                        className={style.input_fields}
                        name='City'
                        value={values.City}
                        onChange={(e) => { onchange_event(e) }}
                    />
                    {errors.City && touched.City ? <p className={style.error_div}>{errors.City}</p> : null}

                </div>
                <div className={style.input12}>
                    <label htmlFor="" className={style.input_label}>Pin Code <b className={style.star}>**</b></label>
                    <input
                        type="text"
                        className={style.input_fields}
                        name='Pin_Code'
                        value={values.Pin_Code}
                        onChange={(e) => { onchange_event(e) }}
                    />
                    {errors.Pin_Code && touched.Pin_Code ? <p className={style.error_div}>{errors.Pin_Code}</p> : null}

                </div>
                <div className={style.input14}>
                    <button type='submit' className={`${style.back_btn} ${btn_style.btn}`}>
                        {profile ? <b>Save</b> : <b>Next</b>}
                    </button>

                    <ToastContainer
                        autoClose={1500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    // theme="colord"
                    />
                </div>
            </form>

            <div className={style.cross}>
                <b onClick={() => { cross_fn() }}><i class="bi bi-x-lg"></i></b>
            </div>

        </div>
    )
}

export default Emp_personal_detail