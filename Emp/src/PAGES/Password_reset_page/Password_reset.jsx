import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import style from '../../COMPONENT/EMP_DETAILS_COMP/Education_option/Education_op.module.css'
import style2 from '../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import style_main from './Password_reset.module.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useRestPasswordMutation } from '../../REDUX/Api/LoginPageApi'
import { reset_password } from '../../HELPER_FUNCTION/Login_helper'


const Password_reset = () => {

    const [eye1, set_eye1] = useState(false) //set password type
    const [eye2, set_eye2] = useState(false) //set confirm password type

    const [ restPassword ] = useRestPasswordMutation() //reset passwprd mutation

    const navigate = useNavigate(); //redirect user to from page

    const location = useLocation() //give location
    const path=location.pathname
    // console.log(location.pathname)

    const valid = Yup.object({
        Password: Yup.string()
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol')
            .required(),
        Confirm_Password: Yup
            .string()
            .oneOf([Yup.ref('Password'), null], 'Must match "password" field value')


    })

    //validation fn show error
    const validation_fn = (e) => {


        e.stopPropagation()
        if (errors.Password) {
            toast.error(<div className="error_box">{errors.Password}</div>)
        }
        else if (errors.Confirm_Password) {
            toast.error(<div className="error_box">{errors.Confirm_Password}</div>)
        }

    }

    //value initilization
    const initialValues = {
        Password: '',
        Confirm_Password: ''
    }

    //formik
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            // console.log(path)
            reset_password(value,path,restPassword)
            
            // resetForm()

        },
    })

    //onchange even handler

    const onchange_event = (e) => {
        handleChange(e)
    }

    //toggle password type 

    const password_type_toggel = (value) => {

        if (value == 2) {
            set_eye2(!eye2)
        }
        else {
            set_eye1(!eye1)

        }
    }

    return (
        <div className={style_main.main}>
            <div className={style.education_op}>
                <center><h3 className={style_main.heading}>Reset Password</h3></center>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className={`${style.ed_box} ${style.ed_box1}`}>
                        <label htmlFor="" className={style2.input_label}>Password <b className={style2.star}>**</b></label>
                        <input
                            type={eye1 ? 'text' : "Password"}
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.Password}
                            name='Password'
                        />
                        <div
                            className={style.password_eye}
                            onClick={() => { password_type_toggel(1) }}
                        ><i class="bi bi-eye-fill"></i></div>

                    </div>
                    <br />
                    <div className={`${style.ed_box} ${style.ed_box1}`}>
                        <label htmlFor="" className={style2.input_label}>Confirm Password <b className={style2.star}>**</b></label>
                        <input
                            type={eye2 ? 'text' : "Password"}
                            className={style2.input_fields}
                            onChange={(e) => { onchange_event(e) }}
                            value={values.Confirm_Password}
                            name='Confirm_Password'
                        />
                        <div
                            className={style.password_eye}
                            onClick={() => { password_type_toggel(2) }}
                        ><i class="bi bi-eye-fill"></i></div>
                    </div>
                    <br />
                    <br />
                    <div className={`${style.ed_box} ${style.ed_box1} ${style_main.btn_box}`}>

                        <button
                            className={style.btn}
                            onClick={(e) => {
                                validation_fn(e)
                            }}
                            type = 'submit'

                        >
                            <b>Submit</b>
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


            </div>
        </div>
    )
}

export default Password_reset