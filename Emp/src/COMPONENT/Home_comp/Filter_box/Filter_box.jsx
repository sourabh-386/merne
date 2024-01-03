import React from 'react'
import style from './Filter_box.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import City_Search from '../../Search_box/City/City_Search'

import Profile_serach from '../../Search_box/Profile/Profile_serach'

const Filter_box = () => {



    //yup validation
    const valid = Yup.object({
        Experience_year: Yup.string()
            .required(),
        Projects_no: Yup.string()
            .required(),
        Working_type: Yup.string()
            .required(),
        Employment_Type: Yup.array()
            .min(1, 'Select at least one Job mode')
            .required('Select at least one Job mode'),
        Manage_freelance: Yup.string()
            .required().min(20)
            .max(300, 'Exceed max length'),
        Opnion: Yup.string()
            .max(300, 'Exceed max length')
    })

    //value initilization
    const initialValues = {
        Experience_year: '1',
        Projects_no: '1',
        Working_type: 'No',
        Employment_Type: [],
        Manage_freelance: '',
        Opnion: ''
    }

    //formik
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            dispatch(set_genral_info(value))

            await Emp_box_data(value, sendEmpboxData, toast, dispatch, setData1)

        },
    })

    //onchange even handler

    return (
        <div className={style.box}>
            <div>
                <Profile_serach />
            </div>

            <div>
                <City_Search />
            </div>

            <div className={style.multi_select}>
                <div><input type="checkbox" name="" id="" />Freelance</div>
                <div><input type="checkbox" name="" id="" />Full Time</div>
                <div><input type="checkbox" name="" id="" />Part Time</div>
                <div><input type="checkbox" name="" id="" />Work from home</div>
            </div>
          
            <hr />
            <div className={style.btn}>
                <button>Apply</button>
            </div>
        </div>
    )
}

export default Filter_box