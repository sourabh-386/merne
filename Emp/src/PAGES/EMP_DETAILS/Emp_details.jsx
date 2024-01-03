import React, { useState } from 'react'
import style from './Emp_details.module.css'
import Emp_detail_top from '../../COMPONENT/EMP_DETAILS_COMP/Emp_details_top/Emp_detail_top'
import { useSelector,useDispatch  } from 'react-redux'
import { set_page_val } from '../../REDUX/REDUCER/Emp_reducer'
import { Submit_btn } from '../../HELPER_FUNCTION/Sending_details.jsx'
import Emp_education from '../../CONTAINER/Emp_education/Emp_education'
import Emp_personal_detail from '../../CONTAINER/Emp_personal/Emp_personal_detail'
import Work_experience from '../../CONTAINER/Work_experience/Work_experience'
import Emp_skills_detail from '../../CONTAINER/Emp_skills/Emp_skills_detail'
import Emp_box from '../../COMPONENT/Emp_box/Emp_box'
import { motion } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEmpDetailsMutation } from '../../REDUX/Api/Sending_data_api'
import { set_React_loader } from '../../REDUX/REDUCER/Other_reducer'
import { useNavigate } from 'react-router-dom'
import { setData2 } from '../../REDUX/REDUCER/Api_response_reducer.jsx'
import Emp_Project from '../../CONTAINER/Emp_Project/Emp_Project.jsx'

const Emp_details = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate(); //redirect user to from page

    const [empDetails] = useEmpDetailsMutation() //this send emp data to backend

    const user_data = useSelector(state => state.Reducer1)//take all data from redux state

    const data1 = useSelector(state => state.Reducer4.Data1)//take all data from redux state

    const Check_job_form_length = useSelector(state => state.Reducer1.job_form_data) //validate page 3

    const Check_educatio = useSelector(state => state.Reducer1.education_form_data) //validate page 2
    
    const Check_graduat_detail = Check_educatio.find((val) => val.Study === 'Graduation/ Post graduation')
    // console.log()

    const page = useSelector((state) => state.Reducer1.page) //maintain page count

    //next btn click fn
    const next_btn_click = () => {

        if (page == 3) {

            if (Check_job_form_length.length > 0) { dispatch(set_page_val(page + 1)) }

            else { toast.error(<div className="error_box">Add atleast one Work Experience</div>) }

        }

        if (page == 2) {

            if (Check_graduat_detail) { dispatch(set_page_val(page + 1)) }

            else { toast.error(<div className="error_box">Graduation details are required.</div>) }

        }

        if (page == 4) {
            dispatch(set_page_val(page + 1))
        }

    }

    return (

        <>
            {/* main content start  */}

            <div className={style.main}>
                <div className={style.main_inside}>
                    <div className={style.main_top}>
                        <Emp_detail_top />
                    </div>
                    <div className={style.main_body}>
                        {
                            page === 1 ?
                                <div className={style.personal}>
                                    <Emp_personal_detail />
                                </div>
                                : ''
                        }
                        {
                            page === 2 ?
                                <div className={style.educational}>
                                    <Emp_education />
                                </div>
                                : ''
                        }
                        {
                            page === 3 ?
                                <div className={style.work_experience}>
                                    <Work_experience />
                                </div>
                                : ''
                        }
                        {
                            page === 4 ?
                                <div className={style.work_experience}>
                                    <Emp_Project />
                                </div>
                                : ''
                        }
                        {
                            page === 5 ?
                                <div className={style.work_experience}>
                                    <Emp_skills_detail  />
                                </div>
                                : ''
                        }

                    </div>
                    <div className={style.main_foot}>
                        {
                            page === 1 ? "" : <button className={`${style.back_btn} ${style.btn}`} onClick={() => { dispatch(set_page_val(page - 1)) }} ><b>Back</b></button>
                        }
                        {
                            page === 5 ? <button className={`${style.submit_btn} ${style.btn}`} onClick={() => { Submit_btn(empDetails, user_data,dispatch, set_React_loader, toast, navigate, setData2) }}><b>Submit</b>

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
                            </button>
                                : page === 1 ? "" :
                                    <button className={`${style.submit_btn} ${style.btn}`} onClick={() => { next_btn_click() }} ><b>Next</b>

                                    </button>

                        }

                    </div>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >

                <div className={`${style.page_box} ${data1 ? style.form_hid : ''}`}>
                    <Emp_box />
                </div>
            </motion.div>

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
        </>
    )
}

export default Emp_details