import React, { useState } from 'react'
import style from './Emp_comp_style.module.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { set_page_val } from '../../../REDUX/REDUCER/Emp_reducer'
const Emp_detail_top = () => {

    const page = useSelector((state) => state.Reducer1.page)
    const dispatch = useDispatch()

    // change page no 
    const change_back = (value) => {
        // dispatch(set_page_val(value))

    }

    return (
        <>
            <div className={style.top}>
                <div className={`${style.top_child} ${page === 1 ? style.c1 : ''}`} onClick={() => { change_back(1) }}>
                    Personal Details

                </div>
                <div className={`${style.top_child} ${page === 2 ? style.c1 : ''}`} onClick={() => { change_back(2) }}>
                    Educational Details

                </div>
                <div className={`${style.top_child} ${page === 3 ? style.c1 : ''}`} onClick={() => { change_back(3) }}>
                    Work Experience

                </div>
                <div className={`${style.top_child} ${page === 4 ? style.c1 : ''}`} onClick={() => { change_back(3) }}>
                    Projects

                </div>
                <div className={`${style.top_child} ${page === 5 ? style.c1 : ''}`} onClick={() => { change_back(3) }}>
                    Skills/ Work Sample

                </div>
            </div>
            <div className={style.top_mobile}>
                <div className={`${style.top_child}`} onClick={() => { change_back(1) }}>
                    {
                        page === 1 ? <p className={`${style.top_child} ${style.c1}`}>Personal Details</p> : ''
                    }
                    {
                        page === 2 ? <p className={`${style.top_child} ${style.c1}`}>Educational Details</p> : ''
                    }
                    {
                        page === 3 ? <p className={`${style.top_child} ${style.c1}`}>Work Experience</p> : ''
                    }
                    {
                        page === 4 ? <p className={`${style.top_child} ${style.c1}`}>Projects </p> : ''

                    }
                    {
                        page === 5 ? <p className={`${style.top_child} ${style.c1}`}>Skills/ Work Sample </p> : ''

                    }
                </div>
            </div>
        </>
    )
}

export default Emp_detail_top