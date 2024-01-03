import { React, useState } from 'react'
import style from './Personal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import upload_img from '../../../assets/upload.png'
const Personal = ({ set_form, set_resume_form, set_profile_form, set_background_blur }) => {

    const dispatch = useDispatch()

    const data = useSelector(state => state.Reducer1)// getting user data
    const personal = data.Personal_detail //personal data
    const image = data.user_image //user image
    const user_img = useSelector((state) => state.Reducer1.user_image);


    const display_form = () => {
        set_form(true)
        dispatch(set_background_blur(true))
    }
    const display__resume_form = () => {
        set_resume_form(true)
        dispatch(set_background_blur(true))
    }

    const [upload_vis, set_upload_vis] = useState(false)

    const upload_click = () => {
        set_upload_vis(false)
        set_profile_form(true)
    }

    return (

        <>
            <div className={style.personal}>

                <div className={style.detail}>
                    <h3 className={style.heading}>{personal.First_Name} {personal.Middle_Name} {personal.Last_Name}</h3>
                    <p>{personal.Email}</p>
                    <p>{personal.Phone}</p>
                    <p>{personal.Address1}, {personal.State ? personal.State : ""}{personal.State_ ? personal.State_ : ""}, {personal.Country ? personal.Country.label ? personal.Country.label : personal.Country : ''}</p>
                    <div className={style.btn}>
                        <p><button onClick={() => { display_form() }}>Edit Profile</button></p>
                        <p><button onClick={() => { display__resume_form() }}>Upload Resume</button></p>
                    </div>


                </div>

                <div className={style.image}>
                    {
                        upload_img ?
                            <img src={user_img} alt="img"
                                onMouseEnter={() => { set_upload_vis(true) }}
                                onMouseLeave={() => { set_upload_vis(false) }}

                            />
                            :
                            <h1>{personal.First_Name.slice(0, 1)}</h1>
                    }
                    <div className={`${style.upload_btn} ${upload_vis ? '' : style.upload_btn_hid}`}>
                        <img
                            onClick={() => { upload_click() }}
                            onMouseEnter={() => { set_upload_vis(true) }}
                            src={upload_img}
                            alt="#"
                        />
                    </div>
                </div>

            </div>

        </>

    )
}

export default Personal