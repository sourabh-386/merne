import React from 'react'
import style from './GoogleSignup.module.css'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { set_React_loader } from '../../../REDUX/REDUCER/Other_reducer';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated, setData1, setData2 } from '../../../REDUX/REDUCER/Api_response_reducer';
import { useNavigate } from 'react-router-dom'
import img from '../../../assets/google.png'
// import { set_User_id } from '../../../REDUX/REDUCER/Login_reducer';
import { send_login_data_google } from '../../../HELPER_FUNCTION/Sign_in_new_user';
import {
    set_personal_detail, set_genral_info, set_job_form_data, set_project_form_data, set_tranning_form_data,
    set_education_form_data, set_user_image, set_Github_Profile, set_Linkdin_Profile, add_skills, set_Portfolio_link, set_Other_work, set_Resume_name, set_Resume_url
} from '../../../REDUX/REDUCER/Emp_reducer';
import { set_User_id, set_create_account_details } from '../../../REDUX/REDUCER/Login_reducer';

const GoogleSignup = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate(); //redirect user to from page



    const google_page = async () => {

        const fetch_user = async () => {

            try {
                dispatch(set_React_loader(true))
                const res = await axios.get('http://localhost:3009/auth/user', { withCredentials: true })
                dispatch(set_React_loader(false))
                // shaving token in localstorage

                // console.log('ssss1')
                send_login_data_google(

                    res,
                    navigate, dispatch, set_React_loader, toast,

                    setIsAuthenticated, setData1, setData2, set_Resume_name,
                    set_Resume_url,
                    set_user_image,

                    set_personal_detail, set_genral_info, set_job_form_data, set_User_id,
                    set_project_form_data, set_tranning_form_data, set_education_form_data,
                    set_create_account_details,

                    add_skills,
                    set_Github_Profile,
                    set_Linkdin_Profile,
                    set_Portfolio_link,
                    set_Other_work

                )


            } catch (error) {
                console.log('error',error)
                dispatch(set_React_loader(false))
                console.log('Something Went Wrong')
            }



        }



        const url = 'http://localhost:3009/auth/google'
        let timer = setTimeout(() => { }, 1000);
        const newWindow = window.open(url, "_blank", "width:500,height=600")

        if (newWindow) {

            timer = setInterval(() => {
                if (newWindow.closed) {
                    // console.log('working')
                    fetch_user()

                    if (timer) clearInterval(timer)
                }

            }, 500);
        }

    }


    return (
        <div className={style.google} >

            {/* <GoogleButton
                uxMode="popup"
                className={style.google_btn}
            /> */}
            <div onClick={google_page} className={style.google_in}>
                <div className={style.google_btn}>
                    <img src={img} alt='G' />
                    <p>Continue With Google</p>
                </div>


            </div>
        </div>
    )
}

export default GoogleSignup