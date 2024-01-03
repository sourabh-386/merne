import React, { useState } from 'react'
import style from './Job_show.module.css'
import { useNavigate, Link } from 'react-router-dom'

const Job_show = ({ val }) => {

    const [home, set_home] = useState(true)

    const navigate = useNavigate()

    return (
        <div className={style.Job_show}>
            <h3 className={style.role}>{val.profile.slice(0, 1).toUpperCase() + val.profile.slice(1).toLowerCase()}</h3>
            <h3 className={style.company}>{val.company.toUpperCase()}</h3>


            <div className={style.job_mode}>

                <i class="bi bi-geo-alt"></i>
                <p>{val.location}</p>
            </div>


            <div className={style.start}>

                <div className={style.start_in}>
                    <b className={style.bold}>Start Date</b>
                    <p>{val.Start_date ? val.Start_date : 'Immediate'}</p>
                </div>

                <div className={style.start_in}>
                    <b className={style.bold}>Salary  <span className={style.option}><i>({val.salary_type.toUpperCase()})</i></span></b>
                    {
                        val.currency.toUpperCase() == 'USD' ?
                            <p>${val.min_salary} {val.max_salary ? ` - $${val.max_salary}` : ''}</p>
                            :
                            <p>₹{val.min_salary} {val.max_salary ? ` - ₹${val.max_salary}` : ''}</p>
                    }
                </div>

                <div className={style.start_in}>
                    <b className={style.bold}>Experience</b>
                    <p>{val.experience ? val.experience : ''} year</p>
                </div>

            </div>

            <div className={style.job_type}>
                {val.part_time ? <p>Part time</p> : ''}
                {val.full_time ? <p>Full time</p> : ''}
                {val.freelance ? <p>Freelance</p> : ''}
                {val.work_from_home ? <p>Work from home</p> : ''}
            </div>

            <div className={style.btn_box}>
                <button>  <Link className={`${style.link} ${style.links}`} to={`/job/${val.job_id}`}><p className={style.name}>Job Details</p></Link></button>


            </div>

        </div>
    )
}

export default Job_show