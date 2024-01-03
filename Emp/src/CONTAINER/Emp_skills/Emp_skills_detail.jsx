import React from 'react'
import style from './Emp_skills_detail.module.css'
import Skill_box from '../../COMPONENT/Emp_skill_comp/Skill_box'
import field_style from '../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import {
  set_Github_Profile,
  set_Linkdin_Profile,
  set_Portfolio_link,
  set_Other_work,
  delete_other_work
} from '../../REDUX/REDUCER/Emp_reducer'
import Other_work_main from '../../COMPONENT/Emp_skill_comp/Other_work_main'


const Emp_skills_detail = () => {

  const dispatch = useDispatch()

  const links = useSelector(state => state.Reducer1.Links)
  console.log(links[0])

  return (
    <div className={style.emp_skills}>

      <Skill_box />

      <form className={style.links}>
        <div >
          <label htmlFor="" className={field_style.input_label}>Github Profile</label>
          <input
            type="text"
            className={field_style.input_fields}
            name='Github_Profile'
            value={links[0].Github_Profile}
            onChange={(e) => { dispatch(set_Github_Profile(e.target.value)) }}
            placeholder='https://www.github.com/profile_name'

          />
        </div>
        <br />
        <div >
          <label htmlFor="" className={field_style.input_label}>Linkdin Profile</label>
          <input
            type="text"
            className={field_style.input_fields}
            name='Linkdin_Profile'
            value={links[1].Linkdin_Profile}
            onChange={(e) => { dispatch(set_Linkdin_Profile(e.target.value)) }}

            placeholder='https://www.linkedin.com/profile_name'
          />
        </div>

        <br />
        <div >
          <label htmlFor="" className={field_style.input_label}>Portfolio link</label>
          <input
            type="text"
            className={field_style.input_fields}
            name='Portfolio_link'
            value={links[2].Portfolio_link}
            onChange={(e) => { dispatch(set_Portfolio_link(e.target.value)) }}

            placeholder='https://www.example.com'

          />
        </div>
        <br />
        <br />
        <div>
          <h3 htmlFor="" className={field_style.input_label}>Other work sample link : </h3>

          <Other_work_main
            dispatch={dispatch}
            set_Other_work={set_Other_work}
            links={links}
            delete_other_work={delete_other_work}
          />
        </div>


      </form>

    </div>
  )
}

export default Emp_skills_detail