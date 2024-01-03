import React, { useEffect } from 'react'
import style from './Sucesspage.module.css'
import tick from '../../../assets/check.png'
import logo from '../../../assets/logo1.png'
const Sucesspage = () => {

    useEffect(() => {
        setTimeout(() => {
            window.close();
        }, 1000);
    }, [])


    return (
        <div className={style.successPage}>
            <div className={style.main}>
                <img src={tick} alt="Tick Icon" className={style.img} />
                <div className={style.box}>
                    <h2 className={style.heading}>Welcome to </h2>
                    <img src={logo} alt="" className={style.logo} />
                    <br />
                    <br />
                    <p className={style.subtext}>
                        🎉 Your login was successful. Let the adventure begin!
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Sucesspage