import { React, useState } from 'react'
import style from './Profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import Personal from '../../COMPONENT/Profile_page_comp/Personal_comp/Personal'
import Emp_personal_detail from '../../CONTAINER/Emp_personal/Emp_personal_detail'
import { set_background_blur } from '../../REDUX/REDUCER/Emp_reducer'
import Educ_comp from '../../COMPONENT/Profile_page_comp/Educ_comp/Educ_comp'
import Job_comp from '../../COMPONENT/Profile_page_comp/Job_comp/Job_comp'
import Job_form from '../../COMPONENT/EMP_DETAILS_COMP/Job_form/Job_form'
import Skill_comp from '../../COMPONENT/Profile_page_comp/Skill_comp/Skill_comp'
import Skill_box from '../../COMPONENT/Emp_skill_comp/Skill_box'
import Link_form from '../../COMPONENT/Profile_page_comp/Link_form_comp/Link_form'
import Link_comp from '../../COMPONENT/Profile_page_comp/Link_comp/Link_comp'
import Project_form from '../../COMPONENT/Profile_page_comp/Project_comp/Project_form_comp/Project_form'
import Project_comp from '../../COMPONENT/Profile_page_comp/Project_comp/Project_comp.jsx/Project_comp'
import Tranning_comp from '../../COMPONENT/Profile_page_comp/Traning_comp/Tranning_comp'
import Tranning_form from '../../COMPONENT/Profile_page_comp/Traning_form/Tranning_form'
import Resume_comp from '../../COMPONENT/Profile_page_comp/Resume_uploder/Resume_comp'
import Education_op2 from '../../COMPONENT/Profile_page_comp/Educ_comp/Education_from/Education_op2'
import Profile_img from '../../COMPONENT/Profile_page_comp/Profile_img_uploader/Profile_img'
import Footer from '../../CONTAINER/Footer/Footer'
const Profile = () => {

  //////////////////////////
  const [form, set_form] = useState(false)
  const [resume_form, set_resume_form] = useState(false)
  const [profile_form, set_profile_form] = useState(false)
  const [job_form, set_job_form] = useState(false)
  const [skill_form, set_skill_form] = useState(false)
  const [link_form, set_link_form] = useState(false)
  const [project_form, set_project_form] = useState(false)
  const [tranning_form, set_tranning_form] = useState(false)
  const [education_form, set_education_form] = useState(false)



  const dispatch = useDispatch()

  const [design_data, set_design_data] = useState({
    heading: '',
    prime: ''
  })



  /////////////////////////////////////



  return (
    <>

      {/* /////////////////// */}
      <div className={`${style.outer_box} ${!form ? "" : style.form_hid}`}>
        <div className={`${style.form}`}>
          <Emp_personal_detail
            set_form={set_form}
            set_background_blur={set_background_blur}
            profile={true} />
        </div>
      </div>

      <div className={`${style.outer_box} ${!job_form ? "" : style.form_hid}`}>

        <div className={`${style.form}`}>
          <Job_form
            dispatch={dispatch}
            set_job_form={set_job_form}
            set_background_blur={set_background_blur}
            profile={true}
          />
        </div>

      </div>

      <div className={`${style.outer_box} ${!skill_form ? "" : style.form_hid}`}>
        <div className={`${style.form} `}>
          <Skill_box
            dispatch={dispatch}
            set_skill_form={set_skill_form}
            set_background_blur={set_background_blur}
            profile={true}
          />
        </div>
      </div>

      <div className={`${style.outer_box} ${!link_form ? "" : style.form_hid}`}>
        <div className={`${style.form} `}>
          <Link_form
            dispatch={dispatch}
            set_link_form={set_link_form}
            set_background_blur={set_background_blur}
          />
        </div>
      </div>

      <div className={`${style.outer_box} ${!project_form ? "" : style.form_hid} `}>
        <div className={`${style.form} `}>
          <Project_form
            dispatch={dispatch}
            set_project_form={set_project_form}
            set_background_blur={set_background_blur}
            profile={true}

          />
        </div>
      </div>

      <div className={`${style.outer_box} ${!tranning_form ? "" : style.form_hid} `}>
        <div className={`${style.form} `}>
          <Tranning_form
            dispatch={dispatch}
            set_tranning_form={set_tranning_form}
            set_background_blur={set_background_blur}
          />
        </div>
      </div>

      <div className={`${style.outer_box} ${!education_form ? "" : style.form_hid} `}>
        <div className={`${style.form} `}>
          <Education_op2
            set_education_form={set_education_form}
            dispatch={dispatch}
            set_background_blur={set_background_blur}
            design_data={design_data}
            profile={true}

          />
        </div>
      </div>

      <div className={`${style.outer_box} ${!resume_form ? "" : style.form_hid} `}>
        <div className={`${style.form} `}>
          <Resume_comp
            set_resume_form={set_resume_form}
            set_background_blur={set_background_blur}
          />
        </div>
      </div>

      <div className={`${style.outer_box} ${!profile_form ? "" : style.form_hid} `}>
        <div className={`${style.form} `}>
          <Profile_img
            set_profile_form={set_profile_form}
            set_background_blur={set_background_blur}
          />
        </div>
      </div>


      {/* //////////////// */}


      <center> <div className={style.heading}><h2>Profile</h2></div></center>

      <div className={style.profile}>

        <div className={style.main}>
          <div className={style.personal}>
            <Personal
              set_form={set_form}
              set_resume_form={set_resume_form}
              set_profile_form={set_profile_form}
              set_background_blur={set_background_blur} />
          </div>
        </div>

        <br />

        <div className={style.main}>
          <div className={style.personal}>
            <Job_comp
              set_job_form={set_job_form}
              set_background_blur={set_background_blur}
              profile={true}

            />
          </div>
        </div>

        <br />

        <div className={style.main}>
          <div className={style.personal}>
            <Skill_comp
              set_skill_form={set_skill_form}
              set_background_blur={set_background_blur}
            />
          </div>
        </div>

        <br />

        <div className={style.main}>
          <div className={style.personal}>
            <Link_comp
              set_link_form={set_link_form}
              set_background_blur={set_background_blur}
            />
          </div>
        </div>

        <br />

        <div className={style.main}>
          <div className={style.personal}>
            <Project_comp
              set_project_form={set_project_form}
              set_background_blur={set_background_blur}
              profile={true}

            />
          </div>
        </div>
        <br />

        <div className={`${style.main} ${style.main2}`}>
          <div className={`${style.personal} `}>
            <Educ_comp
              set_design_data={set_design_data}
              set_education_form={set_education_form}
              profile={true}
            />
          </div>
        </div>
        <br />

        <div className={style.main}>
          <div className={style.personal}>
            <Tranning_comp
              set_tranning_form={set_tranning_form}
              set_background_blur={set_background_blur}
            />
          </div>
        </div>
        <br />

      </div >
<Footer/>
    </>
  )


}

export default Profile