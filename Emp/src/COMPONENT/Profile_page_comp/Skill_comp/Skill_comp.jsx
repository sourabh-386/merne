import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'; 
import style from './Skill_comp.module.css'
import style2 from '../Educ_comp/Educ_comp.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { add_skills } from '../../../REDUX/REDUCER/Emp_reducer'
import close from '../../../assets/close.png'
import { useSendSkillDataMutation } from '../../../REDUX/Api/Sending_data_api'
import { set_React_loader } from '../../../REDUX/REDUCER/Other_reducer';
import { Submit_skill } from '../../../HELPER_FUNCTION/Profile_helper/Skill_fn';

const Skill_comp = ({ set_skill_form, set_background_blur }) => {

    const [sendSkillData] = useSendSkillDataMutation()

    const dispatch = useDispatch()
    const data = useSelector(state => state.Reducer1)// getting user data
    const Skills = data.Skills //job detail

    const add_fn = () => {
        set_skill_form(true)
        dispatch(set_background_blur(true))

    }

    const delete_fn =async (val) => {
        try {

            console.log('del')
           const value= Skills.filter(value => { return (value !== val) })
        
           const res= await Submit_skill(sendSkillData, value, dispatch, set_React_loader, toast, add_skills)


            if (res.data) {
                toast.success(res.data.val)
                dispatch(add_skills(value))

            }
            if (res.error) {
                toast.error(res.error.data.val)
            }
            

        } catch (error) {

            console.log(error)
        }
    }

    return (
        <div>
            <div className={style2.outer}>

                <h3 className={style2.main_head}>Skills</h3>

                <div className={style2.add}>
                    <button onClick={() => { add_fn() }}> <b>+ Skills</b> </button>
                </div>

            </div>
            <div className={style.skills}>
                {Skills ?
                    Skills.map((val, index) => {
                        return (
                            < div className={style.inside}>
                                <p key={index}>{val?val.charAt(0).toUpperCase() + val.slice(1).toLowerCase():''}</p>
                                <b onClick={() => delete_fn(val)}><i class="bi bi-x-lg"></i></b>
                            </div>
                        )
                    })
                    : ''
                }
            </div>
            <br />


        </div>
    )
}

export default Skill_comp