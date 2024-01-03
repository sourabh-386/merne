import React from 'react'
import style from './Register.module.css'
import Register1 from '../../../COMPONENT/Register_comp/Register1'
import Register2 from '../../../COMPONENT/Register_comp/Register2'
import Register3 from '../../../COMPONENT/Register_comp/Register3'
import { useDispatch, useSelector } from 'react-redux'
import { set_login_page, set_login } from '../../../REDUX/REDUCER/Login_reducer'
import { setIsAuthenticated } from '../../../REDUX/REDUCER/Api_response_reducer'
import { send_sign_data } from '../../../HELPER_FUNCTION/Creating_new_user'
import { useAddDataMutation } from '../../../REDUX/Api/LoginPageApi'
import { useNavigate } from 'react-router-dom'
import { set_React_loader } from '../../../REDUX/REDUCER/Other_reducer'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import GoogleSignup from '../../../COMPONENT/Third_party_auth/GoogleAuth/GoogleSignup'
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { set_User_id } from '../../../REDUX/REDUCER/Login_reducer'

const Register = ({ set_login }) => {


    const dispatch = useDispatch()
    const login_page = useSelector(state => state.Reducer2.loginpage)
    const input_data = useSelector(state => state.Reducer2.create_account_details)

    const [addData] = useAddDataMutation() //this send data to backend
    const navigate = useNavigate(); //redirect user to from page



    const next_btn_fn = () => {

        try {

            send_sign_data(login_page, input_data, set_login_page, addData, navigate, dispatch, set_React_loader, setIsAuthenticated,set_User_id, toast)

        } catch (error) {
            alert(error)
        }


    }

    const back_btn_fn = () => {
        if (login_page > 1) {
            dispatch(set_login_page(login_page - 1))
        }
    }

    return (
        <div className={style.register}>
            <div className={style.register_main}>
                <div className={style.register_main_inside}>
                    {
                        login_page == 1 ? <Register1 /> : ''
                    }
                    {
                        login_page == 2 ? <Register2 /> : ''
                    }
                    {
                        login_page == 3 ? <Register3 /> : ''
                    }
                </div>

                <table
                    width='100%'
                    className={style.table}
                >
                    <tr>
                        <td colSpan='2'>
                            <center>
                                <p
                                    className={style.next}
                                    onClick={() => { next_btn_fn() }}
                                ><b>{login_page == 3 ? "Submit" : 'Next'}</b></p>
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
                            </center>
                        </td>
                    </tr>
                    <tr>
                        <p
                            className={style.back_btn}
                            onClick={() => { back_btn_fn() }}
                        >Back</p>
                    </tr>

                    {/* <tr>
                        <td colSpan='2'>
                            <center>--------- Or --------</center>
                        </td>
                    </tr> */}
                </table>
            </div>


            <div className={style.google}>
                <div><GoogleSignup /></div>
                {/* <br /> */}
                <br />
                <div >
                    <center>Already have Account ? <b
                        className={style.new_account}
                        onClick={() => { (set_login(true)) }}
                    >Login</b> </center></div>
            </div>
        </div>
    )
}

export default Register