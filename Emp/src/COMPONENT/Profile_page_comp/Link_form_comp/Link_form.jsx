import React, { useRef } from 'react'
import style from './Link_form.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { set_links } from '../../../REDUX/REDUCER/Emp_reducer'
import Other_work from '../../Emp_skill_comp/Other_work'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import field_style from '../../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import btn_style from '../../EMP_DETAILS_COMP/Education_option/Education_op.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSendPortfolioDataMutation } from '../../../REDUX/Api/Sending_data_api'
import { set_React_loader } from '../../../REDUX/REDUCER/Other_reducer'


const Link_form = ({ set_link_form, set_background_blur }) => {

    const dispatch = useDispatch()
    const [sendPortfolioData] = useSendPortfolioDataMutation()
    const links = useSelector(state => state.Reducer1.Links)

    const save_fn = () => {
        set_link_form(false)
        dispatch(set_background_blur(false))
    }

    const initialValues = {

        Github_Profile: links[0].Github_Profile,
        Linkdin_Profile: links[1].Linkdin_Profile,
        Portfolio_link: links[2].Portfolio_link,
        Other_work: links[3].Other_work,

    }



    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: async (value, { resetForm }) => {

            try {
                const res = await sendPortfolioData(value)

                if (res.data) {

                    dispatch(set_links(
                        [
                            { 'Github_Profile': value.Github_Profile.trim() },
                            { 'Linkdin_Profile': value.Linkdin_Profile.trim() },
                            { 'Portfolio_link': value.Portfolio_link.trim() },
                            { 'Other_work': value.Other_work }
                        ]
                    ))

                    toast.success(res.data.val)
                }
                else if (res.error) { toast.error(res.error.data.val) }

            } catch (error) {
                console.log(error)
                toast.error('Failed to save.')

            }



        }
    })


    return (
        <div className={style.links}>
            <center><h3>Portfolio/ Work sample</h3></center>
            <br />
            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="" className={field_style.input_label}>Github Profile</label>
                    <input
                        type="text"
                        className={field_style.input_fields}
                        name='Github_Profile'
                        value={values.Github_Profile}
                        onChange={handleChange}
                        placeholder='https://www.github.com/profile_name'
                    />
                </div>


                <br />

                <div >
                    <label htmlFor="" className={field_style.input_label}>Linkedin Profile</label>
                    <input
                        type="text"
                        className={field_style.input_fields}
                        name='Linkdin_Profile'
                        value={values.Linkdin_Profile}
                        onChange={handleChange}
                        placeholder='https://www.linkedin.com/profile_name'
                    />
                </div>

                <br />

                <div >
                    <label htmlFor="" className={field_style.input_label}>Portfolio link</label>
                    <input
                        type="text"
                        className={field_style.input_fields}
                        name='Portfolio_link'
                        value={values.Portfolio_link}
                        onChange={handleChange}
                        placeholder='https://www.example.com'
                    />
                </div>
                <br />
                <div>
                    <h3 htmlFor="" className={field_style.input_label}>Other work sample link : </h3>

                    <Other_work
                        values={values}
                        setFieldValue={setFieldValue}
                    />

                    <div className={style.btn_box}>

                        <button type='submit' className={btn_style.btn} onClick={() => { save_fn() }}><b>Save </b></button>

                    </div>

                    <div className={style.cross}>
                        <b onClick={() => { save_fn() }}><i class="bi bi-x-lg"></i></b>
                    </div>

                </div>
            </form>

        </div>
    )
}

export default Link_form