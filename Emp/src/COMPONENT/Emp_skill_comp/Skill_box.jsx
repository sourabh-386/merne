import React from 'react'
import { useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import style from './Skill_box.module.css'
import { useRef } from 'react';
import add_btn from '../../assets/plus.png'
import cross_btn from '../../assets/close.png'
import input_style from '../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { add_skills, delete_skills } from '../../REDUX/REDUCER/Emp_reducer';
import { set_React_loader } from '../../REDUX/REDUCER/Other_reducer';
import btn_style from '../EMP_DETAILS_COMP/Education_option/Education_op.module.css'
import { useSendSkillDataMutation } from '../../REDUX/Api/Sending_data_api';
import { Submit_skill } from '../../HELPER_FUNCTION/Profile_helper/Skill_fn';

const Skill_box = ({ set_skill_form, set_background_blur, profile }) => {

    const dispatch = useDispatch()
    const skills = useSelector(state => state.Reducer1.Skills)
    const [sendskillData] = useSendSkillDataMutation()
    // console.log(skills)

    //save skills values
    const [value, set_value] = useState(skills)

    //fro skill input box
    const skillref = useRef(null)

    //use for adding skills
    function add_skill_fn(e) {

        let skill_val = skillref.current.value.trim()

        const dublicate_skill = value.find((val => { return (val.toLowerCase() == skill_val.toLowerCase()) }))

        if (skill_val.length !== 0) {
            if (dublicate_skill == undefined) {

                set_value([...value, skill_val])

                if (!profile) {
                    console.log(profile)

                    dispatch(add_skills([...value, skill_val]))
                }
                skillref.current.value = ''
            }
            else {
                toast.error(<div className="error_box">{skill_val} is already added</div>)
            }
        }

    }

    // delete skill 
    function delete_skill_fn(skill, e) {
        set_value(value.filter(value => { return (value !== skill) }))
        if (!profile) {
            dispatch(delete_skills(skill))
        }

    }

    const save_fn = () => {

        Submit_skill(sendskillData, value, dispatch, set_React_loader, toast, add_skills)
        dispatch(set_background_blur(false))
        set_skill_form(false)

    }
    const close_fn = () => {

        dispatch(set_background_blur(false))
        set_skill_form(false)

    }


    if (profile) {
        return (

            <div className={style.min_div} >
                <br />
                <center><label className={style.lable}><b>Add Skills </b></label></center>
                <br />
                <div className={style.skill_box}>
                    {
                        value.map((skill, index) => {
                            return (
                                <div className={style.outer_add_skill} key={index} >
                                    <input
                                        type="text"
                                        name='skills'
                                        className={`${input_style.input_fields} ${style.add_skill}`}
                                        placeholder='Add Skills'
                                        value={skill}
                                        disabled={true}
                                    />
                                    <img className={style.plus_btn} src={cross_btn} alt="*" onClick={(e) => { delete_skill_fn(skill, e) }} />
                                </div>
                            )
                        })
                    }

                    <div className={style.outer_add_skill} >
                        <input
                            type="text"
                            name='skills'
                            className={`${input_style.input_fields} ${style.add_skill}`}
                            placeholder='Add Skills'
                            ref={skillref}
                        />
                        <img className={style.plus_btn} src={add_btn} alt="+" onClick={(e) => { add_skill_fn(e) }} />
                        <ToastContainer
                            autoClose={1500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>


                </div>

                <div className={style.btn_box}>
                    <button className={btn_style.btn} onClick={() => { save_fn() }}><b>Save</b></button>
                </div>

                <div className={style.cross}>
                    <b onClick={() => { close_fn() }}><i class="bi bi-x-lg"></i></b>
                </div>

            </div>

        )
    }
    else {

        return (

            <div className={style} >
                <label className={style.lable}><b>Skills </b></label>
                <div className={`${style.skill_box} ${style.skill_box2}`}>
                    {
                        skills.map((skill, index) => {
                            return (
                                <div className={style.outer_add_skill} key={index} >
                                    <input
                                        type="text"
                                        name='skills'
                                        className={`${input_style.input_fields} ${style.add_skill}`}
                                        placeholder='Add Skills'
                                        value={skill}
                                        disabled={true}
                                    />
                                    <img className={style.plus_btn} src={cross_btn} alt="*" onClick={(e) => { delete_skill_fn(skill, e) }} />
                                </div>
                            )
                        })
                    }

                    <div className={style.outer_add_skill} >
                        <input
                            type="text"
                            name='skills'
                            className={`${input_style.input_fields} ${style.add_skill}`}
                            placeholder='Add Skills'
                            ref={skillref}
                        />
                        <img className={style.plus_btn} src={add_btn} alt="+" onClick={(e) => { add_skill_fn(e) }} />
                        <ToastContainer
                            autoClose={1500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>

                </div>

                {/* <div className={style.search_results}>
                cscxc
            </div> */}

            </div>

        )

    }

}

export default Skill_box