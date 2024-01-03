import React, { useState } from 'react'
import style from './Education_show.module.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  set_class_10_detail,
  set_class_12_detail,
  set_graduation_detail,
  set_phd_detail,
  set_diploma_detail
} from '../../../REDUX/REDUCER/Emp_reducer'
import box from'../../../assets/box.png'

const Education_show = () => {

  const dispatch = useDispatch()

  const class_10_detail = useSelector(state => state.Reducer1.class_10_detail)
  const class_12_detail = useSelector(state => state.Reducer1.class_12_detail)
  const graduation_detail = useSelector(state => state.Reducer1.graduation_detail)
  const phd_detail = useSelector(state => state.Reducer1.phd_detail)
  const diploma_detail = useSelector(state => state.Reducer1.diploma_detail)

  console.log(class_10_detail.length)

  return (
    <>
      {
        class_10_detail.length !== 0 ?

          [class_10_detail].map((value) => {
            return (
              <div className={style.course_box}>
                <h4 className={style.heading}>Secondry (X)</h4>

                <div className={style.heading_div}>
                  <p>{value.School}</p>
                  <p>, ({value.Board})</p>

                </div>
                <p>Completion Year : {value.Comp_date}</p>
                {/* <p>CGPA : {value.Percentage}</p> */}

                <div className={style.course_edit}>
                  <i
                    class="bi bi-pencil-square"
                  ></i>
                  <i
                    class="bi bi-trash3-fill"
                    onClick={() => { dispatch(set_class_10_detail([])) }}

                  ></i>
                </div>
              </div>
            )
          }) : ''

      }

      {
        class_12_detail.length !== 0 ?
          [class_12_detail].map((value) => {
            return (
              <div className={style.course_box}>
                <h4 className={style.heading}>Senior Secondry (XII)</h4>

                <div className={style.heading_div}>
                  <p>{value.School}</p>
                  <p>, ({value.Board})</p>

                </div>
                <p>Completion Year : {value.Comp_date}</p>
                {/* <p>CGPA : {value.Percentage}</p> */}
                <div className={style.course_edit}>
                  <i class="bi bi-pencil-square"></i>
                  <i
                    class="bi bi-trash3-fill"
                    onClick={() => { dispatch(set_class_12_detail([])) }}
                  ></i>

                </div>
              </div>
            )
          }) : ''
      }

{
        diploma_detail.length !== 0 ?
          diploma_detail.map((value) => {
            return (
              <div className={style.course_box}>
                <div className={style.heading_div}>
                  <h4 className={style.heading}>{value.Degree}</h4>
                  <h4 className={style.heading}>, {value.Stream}</h4>
                  <h4 className={style.heading}> ({value.Study})</h4>

                </div>
                <div className={style.heading_div}>
                  <p>{value.Collage}</p>
                </div>
                <p>{value.Start_date} - {value.End_date}</p>
                {/* <p>CGPA : {value.Percentage}</p> */}

                <div className={style.course_edit}>
                  <i class="bi bi-pencil-square"></i>
                  <i
                    class="bi bi-trash3-fill"
                    onClick={() => { dispatch(set_diploma_detail([])) }}
                  ></i>
                </div>
              </div>
            )
          }) : ''

      }
      {
        graduation_detail.length !== 0 ?
        graduation_detail.map((value,index) => {
            return (
              <div className={style.course_box} key={index}>
                <div className={style.heading_div}>
                  <h4 className={style.heading}>{value.Degree}</h4>
                  <h4 className={style.heading}>, {value.Stream} </h4>
                  <h4 className={style.heading}> ({value.Study})</h4>

                </div>
                <div className={style.heading_div}>
                  <p>{value.Collage}</p>
                </div>
                <p>{value.Start_date} - {value.End_date}</p>
                {/* <p>CGPA : {value.Percentage}</p> */}

                <div className={style.course_edit}>
                  <i class="bi bi-pencil-square"></i>
                  <i
                    class="bi bi-trash3-fill"
                    onClick={() => { dispatch(set_graduation_detail([])) }}
                  ></i>
                </div>
              </div>
            )
          }) : ''

      }
      {
        phd_detail.length !== 0 ?
          phd_detail.map((value) => {
            return (
              <div className={style.course_box}>
                <div className={style.heading_div}>
                  <h4 className={style.heading}>{value.Degree}</h4>
                  <h4 className={style.heading}>, {value.Stream}</h4>
                  <h4 className={style.heading}> ({value.Study})</h4>

                </div>
                <div className={style.heading_div}>
                  <p>{value.Collage}</p>
                </div>
                <p>{value.Start_date} - {value.End_date}</p>
                {/* <p>CGPA : {value.Percentage}</p> */}

                <div className={style.course_edit}>
                  <i class="bi bi-pencil-square"></i>
                  <i
                    class="bi bi-trash3-fill"
                    onClick={() => { dispatch(set_phd_detail([])) }}
                  ></i>
                </div>
              </div>
            )
          }) : ''

      }
     
      {
        class_10_detail.length === 0 &&
          class_12_detail.length === 0 &&
          graduation_detail.length === 0 &&
          phd_detail.length === 0 &&
          diploma_detail.length === 0 ?
          <div className={style.no_data_box}>
            <img  src={box} alt="#" />
            <p>No Educational data</p>
            </div> :
          ''

      }

    </>
  )
}

export default Education_show