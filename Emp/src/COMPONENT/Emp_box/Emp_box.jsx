import React from 'react'
import style_main from './Emp_box.module.css'
import style from '../EMP_DETAILS_COMP/Education_option/Education_op.module.css'
import style2 from '../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import textarea_style from '../EMP_DETAILS_COMP/Job_form/Job_form.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Emp_box_data } from '../../HELPER_FUNCTION/Sending_details'
import { useSendEmpboxDataMutation } from '../../REDUX/Api/Sending_data_api'
import { setData1 } from '../../REDUX/REDUCER/Api_response_reducer'
import { set_genral_info } from '../../REDUX/REDUCER/Emp_reducer'
const Emp_box = () => {

    const dispatch = useDispatch()

    const [sendEmpboxData] = useSendEmpboxDataMutation()//send data

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

    //validation fn show error
    const validation_fn = (e) => {


        e.stopPropagation()
        if (errors.Experience_year) {
            toast.error(<div className="error_box">{errors.Experience_year}</div>)
        }
        else if (errors.Projects_no) {
            toast.error(<div className="error_box">{errors.Projects_no}</div>)
        }
        else if (errors.Working_type) {
            toast.error(<div className="error_box">{errors.Working_type}</div>)
        }
        else if (errors.Employment_Type) {
            toast.error(<div className="error_box">{errors.Employment_Type}</div>)
        }
        else if (errors.Manage_freelance) {
            toast.error(<div className="error_box">{errors.Manage_freelance}</div>)
        }
    }

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
    const onchange_event = (e) => { handleChange(e) }



    return (
        <div className={`${style.education_op} ${style_main.main_box}`}>
            <center><h2>Heading</h2></center>
            <br />
            <form className={style.ed_form} onSubmit={handleSubmit}>
                <div className={`${style.ed_box} ${style.ed_box1}`}>
                    <label htmlFor="" className={style2.input_label}>Years of Experience in Freelance work?<b className={style2.star}>**</b></label>
                    <select
                        name="Experience_year"
                        value={values.Experience_year}
                        onChange={(e) => { onchange_event(e) }}
                        className={style2.input_fields}
                    >

                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                    </select>
                </div>

                <div className={`${style.ed_box} ${style.ed_box1}`}>
                    <label htmlFor="" className={style2.input_label}>How many projects worked in freelance?<b className={style2.star}>**</b></label>
                    <select
                        name="Projects_no"
                        value={values.Projects_no}
                        onChange={(e) => { onchange_event(e) }}
                        className={style2.input_fields}

                    >

                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10+">10+</option>
                    </select>
                </div>

                <div className={`${style.ed_box} ${style.ed_box1}`}>
                    <label htmlFor="" className={style2.input_label}>Do you have team to manage your work?<b className={style2.star}>**</b></label>
                    <select
                        name="Working_type"
                        value={values.Working_type}
                        onChange={(e) => { onchange_event(e) }}
                        className={style2.input_fields}

                    >

                        <option value="No">No</option>
                        <option value="Yes">Yes</option>

                    </select>
                </div>

                <div className={`${style.ed_box} ${style.ed_box1}`}>
                    <label htmlFor="" className={style2.input_label}>Preferd Job mode<b className={style2.star}>**</b><spam className={style_main.input_label_extra}>( user can select multiple options )</spam></label>
                    <div className={style_main.checkbox_div}>
                        <div >
                            <input
                                className={style_main.checkbox_div_inner}
                                type="checkbox"
                                onChange={(e) => { onchange_event(e) }}
                                name="Employment_Type"
                                id=""
                                value='Permanent'
                                checked={values.Employment_Type.includes('Permanent')}

                            />Permanent
                        </div>
                        <div >
                            <input
                                className={style_main.checkbox_div_inner}
                                type="checkbox"
                                onChange={(e) => { onchange_event(e) }}
                                name="Employment_Type"
                                id=""
                                value='Freelance'
                                checked={values.Employment_Type.includes('Freelance')}


                            />Freelance
                        </div>
                        <div >
                            <input
                                className={style_main.checkbox_div_inner}
                                type="checkbox"
                                onChange={(e) => { onchange_event(e) }}
                                name="Employment_Type"
                                id=""
                                value='Contractual'
                                checked={values.Employment_Type.includes('Contractual')}


                            />Contractual
                        </div>
                    </div>

                </div>

                <div className={`${textarea_style.ed_box} ${textarea_style.textarea}`}>
                    <label htmlFor="" className={style2.input_label}>How will you Manage your Freelance work?<b className={style2.star}>**</b></label>

                    <textarea
                        className={style2.input_fields}
                        name="Manage_freelance"
                        value={values.Manage_freelance}
                        onChange={(e) => { onchange_event(e) }}
                        cols="50"
                        rows="4"
                    />

                </div>

                <div className={`${textarea_style.ed_box} ${textarea_style.textarea}`}>
                    <label htmlFor="" className={style2.input_label}>Please suggest your opinion on freelancebharat.</label>

                    <textarea
                        className={style2.input_fields}
                        name="Opnion"
                        value={values.Opnion}
                        onChange={(e) => { onchange_event(e) }}
                        cols="50" rows="4"
                    />

                </div>


                <div className={style.ed_box6}>
                    <button
                        className={style.btn}
                        onClick={(e) => { validation_fn(e) }}
                        type='submit'
                    >
                        Submit
                    </button>
                </div>

            </form>

        </div>
    )
}

export default Emp_box