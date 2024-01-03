import React, { useState } from 'react'
import style from './LoginPage.module.css'
import page_img from '../../assets/reg_img.png'
import Register from '../../CONTAINER/Login_page_comp/Register/Register'
import Sign from '../../CONTAINER/Login_page_comp/Sign/Sign'
import img from '../../assets/bg.jpg'
import Footer from '../../CONTAINER/Footer/Footer'

const LoginPage = ({login,set_login}) => {

    // const [login, set_login] = useState(false)

    return (
        <>
        <div className={style.landingpage}>
            <img src={img} alt="" className={style.img} />
            <div className={style.Register}>
                <div className={`${style.child_box} ${style.child_box_1}`}>
                    <div className={style.child1_top}>
                        <p><b>Join the #1 job site</b></p>
                        <p><b>for 100K+ jobs</b></p>

                    </div>
                    {
                        login ?
                            <div className={`${style.child1_body} `}>
                                <Sign set_login={set_login} />
                            </div>
                            :
                            <div className={`${style.child1_body} `}>
                                <Register set_login={set_login} />
                            </div>
                    }

                </div>
               

            </div>
         

        </div>
        <div className='comp'>
          <Footer />
        </div>
        </>
    )
}

export default LoginPage