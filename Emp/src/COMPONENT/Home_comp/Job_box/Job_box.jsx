import React from 'react'
import style from './Job_box.module.css'
import Job_show from '../Job_show/Job_show'

const Job_box = ({ job_data }) => {

    // const array = [1, 2, 3, 4, 5]

    return (
        <div className={style.job}>
            {
                job_data.map((val, index) => {
                    return (<Job_show val={val} key={index} />)
                })
            }

        </div>
    )
}

export default Job_box