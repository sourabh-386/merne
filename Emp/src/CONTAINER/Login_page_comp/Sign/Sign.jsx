import React, { useRef, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import style from '../Register/Register.module.css'
import table_style from '../../../COMPONENT/Register_comp/Main.module.css'
import { useDispatch, useSelector } from 'react-redux'
import field_style from '../../Emp_personal/Emp_personal_detail.module.css'
import {  send_forgotPassword_email } from '../../../HELPER_FUNCTION/Login_helper'
import { useAddDataLoginMutation, useForgotPasswordMutation } from '../../../REDUX/Api/LoginPageApi'
import { useNavigate } from 'react-router-dom'
import { set_React_loader } from '../../../REDUX/REDUCER/Other_reducer';
import { isValidEmail } from '../../../HELPER_FUNCTION/Login_helper' //validate email
import { setIsAuthenticated, setData1, setData2 } from '../../../REDUX/REDUCER/Api_response_reducer';
import { set_User_id } from '../../../REDUX/REDUCER/Login_reducer';
import {

    set_personal_detail,
    set_job_form_data,
    set_project_form_data,
    set_tranning_form_data,
    set_education_form_data,
    add_skills,
    set_Github_Profile,
    set_Linkdin_Profile,
    set_Portfolio_link,
    set_Other_work,
    set_genral_info,
    set_Resume_name,
    set_Resume_url,
    set_user_image
    

} from '../../../REDUX/REDUCER/Emp_reducer';

import { set_create_account_details } from '../../../REDUX/REDUCER/Login_reducer';
import { send_login_data } from '../../../HELPER_FUNCTION/Sign_in_new_user';
import GoogleSignup from '../../../COMPONENT/Third_party_auth/GoogleAuth/GoogleSignup';
const Sign = ({ set_login }) => {

    const [email, set_email] = useState()
    const [password, set_password] = useState()
    const [forgot_password, set_forgot_password] = useState(false)
    const forgot_password_ref = useRef(null)

    const navigate = useNavigate(); //redirect user to from page
    const dispatch = useDispatch()

    const [forgotPassword] = useForgotPasswordMutation() //mutation api send data forgot password

    const [addDataLogin] = useAddDataLoginMutation() //mutation api send data 


    //work for login
    const submit_sign = () => {

        send_login_data(

            email, password,

            addDataLogin, navigate, dispatch, set_React_loader, toast,

            setIsAuthenticated, setData1, setData2, set_Resume_name,
            set_Resume_url,
            set_user_image,set_User_id,

            set_personal_detail, set_genral_info, set_job_form_data,
            set_project_form_data, set_tranning_form_data, set_education_form_data,
            set_create_account_details,

            add_skills,
            set_Github_Profile,
            set_Linkdin_Profile,
            set_Portfolio_link,
            set_Other_work
        )

    }

    const forgot_password_fn = () => {//work when user click on forgot password and take email and send 

        const user_email = forgot_password_ref.current.value

        if (user_email && user_email.trim() !== '' && isValidEmail(user_email)) {

            send_forgotPassword_email(forgotPassword, user_email, dispatch, set_forgot_password)

        }
        else { toast.error(<div className="error_box">ddd</div>) }
    }


    return (
        <div className={style.register}>
            <div className={`${style.register_main} ${style.space}`}>


                <table
                    width='100%'
                    className={table_style.table2}
                >
                    {!forgot_password ?
                        <tr>
                            <td colSpan='2'>
                                <input type="email"
                                    className={field_style.input_fields}
                                    placeholder='Email'
                                    name='Email'
                                    // value={field_data[0].Email}
                                    onChange={(e) => set_email(e.target.value)}
                                />
                            </td>

                        </tr> : ''
                    }
                    <br />

                    {!forgot_password ?
                        <tr>
                            <td colSpan='2'>
                                <input type="password"
                                    className={field_style.input_fields}
                                    placeholder='Password'
                                    name='Password'
                                    // value={field_data[1].Password}
                                    onChange={(e) => set_password(e.target.value)}
                                />
                            </td>
                        </tr> : ''
                    }
                    {!forgot_password ? "" : <center><h3>Password Reset</h3></center>}

                    <br />

                    {
                        !forgot_password ? "" :
                            <tr>
                                <td colSpan='2'>
                                    <input
                                        type="email"
                                        className={field_style.input_fields}
                                        placeholder='Email'
                                        name='Email'
                                        ref={forgot_password_ref}
                                    />
                                </td>
                            </tr>
                    }
                    {!forgot_password ? "" :
                        <br />
                    }

                    <tr>
                        <td colSpan='2'>
                            <center>
                                <p
                                    className={style.next}
                                    onClick={() => { !forgot_password ? submit_sign() : forgot_password_fn() }}
                                ><b>Submit</b></p></center>
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
                        </td>
                    </tr>

                    <br />

                    <tr>
                        <td colSpan='2'>
                            {forgot_password ? <center onClick={() => { set_forgot_password(false) }}>Back</center> :
                                <center><p onClick={() => { set_forgot_password(true) }}> Forgot Password?</p></center>
                            }
                            <br />
                            {/* <center>--------- Or --------</center> */}
                        </td>
                    </tr>
                </table>
            </div>


            <div className={style.google}>
                <GoogleSignup/>
                <br />
                <div >
                    <center>Create <b
                        className={style.new_account}
                        onClick={() => { set_login(false) }}
                    >New Account</b> </center></div>
            </div>
        </div>
    )
}

export default Sign