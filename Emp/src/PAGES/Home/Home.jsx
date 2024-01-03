import React, { useState, useEffect } from 'react'
import style from './Home.module.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Job_box from '../../COMPONENT/Home_comp/Job_box/Job_box'
import Filter_box from '../../COMPONENT/Home_comp/Filter_box/Filter_box'
import { useJobDataQuery } from '../../REDUX/Api/JobDataApi.js'
import Footer from '../../CONTAINER/Footer/Footer.jsx';
const Home = () => {

  const [job_data, set_job_data] = useState()


  const { data, error, isLoading } = useJobDataQuery()

  useEffect(() => {
    isLoading ? '' : set_job_data(data.data)
    error ? toast.error(error) : ''
  }, [isLoading, error])

  // console.log(job_data)

  return (
    <>
      <div className={style.home}>
        <div className={style.heading}>
          <h1>Follow Your Passion</h1>

        </div>
        <div className={style.home_inside}>
          <div className={style.main}>

            {
              job_data ?
                <>
                  <div className={style.filter}>
                    <Filter_box />
                  </div>
                  <div className={style.job_box}>
                    <Job_box job_data={job_data} />
                  </div>
                </>
                :
                <div className={style.main}>
                  <div className={style.side}>
                    <div class="animated-background sidebox">
                      <div class="background-masker"></div>
                    </div>
                  </div>

                  <div className={style.box}>
                    <div class="animated-background">
                      <div class="background-masker"></div>
                    </div>
                    <div class="animated-background">
                      <div class="background-masker"></div>
                    </div>
                    <div class="animated-background">
                      <div class="background-masker"></div>
                    </div>

                  </div>
                </div>
            }
          </div>
        </div>


      </div>
      <Footer />
    </>
  )
}

export default Home