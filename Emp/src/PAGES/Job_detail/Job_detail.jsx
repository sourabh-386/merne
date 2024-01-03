import { React, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useJobDataOneQuery } from '../../REDUX/Api/JobDataApi';
import style from '../../COMPONENT/Home_comp/Job_show/Job_show.module.css'
import style_main from './Job_detail.module.css'
import Footer from '../../CONTAINER/Footer/Footer';
const Job_detail = () => {

    const [job_details, set_job_details] = useState()

    const { job_id } = useParams();

    const { data, error, isLoading } = useJobDataOneQuery(job_id)

    useEffect(() => {
        !data ? '' : set_job_details(data.data[0])
        error ? toast.error(error) : ''
    }, [data, error])

    return (
        <>
            {job_details ?
                <div className={style_main.main}>
                    < div className={style_main.Job_show} >
                        <h2 className={style_main.role}>{job_details.profile.slice(0, 1).toUpperCase() + job_details.profile.slice(1).toLowerCase()}</h2>
                        <h3 className={style_main.company}>( {job_details.company.toUpperCase()} )</h3>


                        <div className={style.job_mode}>

                            <i class="bi bi-geo-alt"></i>
                            <p>{job_details.location}</p>
                        </div>


                        <div className={style.start}>

                            <div className={style.start_in}>
                                <b className={style.bold}>Start Date</b>
                                <p>{job_details.Start_date ? job_details.Start_date : 'Immediate'}</p>
                            </div>

                            <div className={style.start_in}>
                                <b className={style.bold}>Salary  <span className={style.option}><i>({job_details.salary_type.toUpperCase()})</i></span></b>
                                {
                                    job_details.currency.toUpperCase() == 'USD' ?
                                        <p>${job_details.min_salary} {job_details.max_salary ? ` - $${job_details.max_salary}` : ''}</p>
                                        :
                                        <p>₹{job_details.min_salary} {job_details.max_salary ? ` - ₹${job_details.max_salary}` : ''}</p>
                                }
                            </div>

                            <div className={style.start_in}>
                                <b className={style.bold}>Experience</b>
                                <p>{job_details.experience ? job_details.experience : ''} year</p>
                            </div>

                        </div>

                        <div className={style.job_type}>
                            {job_details.part_time ? <p>Part time</p> : ''}
                            {job_details.full_time ? <p>Full time</p> : ''}
                            {job_details.freelance ? <p>Freelance</p> : ''}
                            {job_details.work_from_home ? <p>Work from home</p> : ''}
                        </div>

                        <br />
                        <hr />
                        <br />

                    </div >
                </div>
                :
                <h1>No data</h1>
            }
            <br />
            <Footer />
        </>
    )

}

export default Job_detail