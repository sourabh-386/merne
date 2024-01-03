import React from 'react'
import style from './Footer.module.css'
import logo from '../../assets/logo1.png'
import facebook from '../../assets/facebook.png'
import linkedin from '../../assets/linkedin.png'
import twitter from '../../assets/twitter.png'
import { Link } from 'react-router-dom'

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className={style.footer}>
                <div>
                    <img src={logo} alt="" className={style.logo} />
                    <p className={style.para}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum fugiat corporis distinctio? Voluptatem rem nihil error, recusandae quisquam laudantium alias.</p>

                </div>
                <div>
                    <center>
                        <h3 className={style.contact}>Contact us</h3></center>
                    <br />
                    <p className={style.contact_box}><i class="bi bi-telephone"></i><a href="mailto:example@example.com">example@example.com</a></p>
                    <p className={style.contact_box}><i class="bi bi-envelope"></i><a href="tel:+1234567890">+1 (234) 567-890</a></p>

                </div>
                <div>
                    <center>
                        <h3 className={style.contact}>Social Links</h3></center>
                    <div className={style.icon}>
                        <a href='#'><img src={linkedin} alt="img" /></a>
                        <a href='#'><img src={twitter} alt="img" /></a>
                        <a href='#'><img src={facebook} alt="img" /></a>
                    </div>
                </div>
            </div>
            <div className={style.copy}>
                <Link to="/copyrightPolicies" onClick={() => { window.scrollTo(0, 0) }} ><p> www.freelancebharat.com Copyright © {currentYear}</p></Link>

            </div>
        </>
    )
}

export default Footer