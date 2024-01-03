import { React, useState, useEffect } from 'react'
import style_main from './Project_form.module.css'
import style from '../../../EMP_DETAILS_COMP/Job_form/Job_form.module.css'
import input_style from '../../../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import btn_style from '../../../../COMPONENT/EMP_DETAILS_COMP/Education_option/Education_op.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
    set_project_form_data,
    update_project_form_data,
    set_project_form_edit_data
} from '../../../../REDUX/REDUCER/Emp_reducer'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux'

import { Submit_project } from '../../../../HELPER_FUNCTION/Profile_helper/Project_fn'
import { useSendProjectDataMutation } from '../../../../REDUX/Api/Sending_data_api'
import { set_React_loader } from '../../../../REDUX/REDUCER/Other_reducer'
const Project_form = ({ set_project_form, set_background_blur, dispatch, profile }) => {


    const [sendProjectData] = useSendProjectDataMutation()

    // const dispatch = useDispatch()
    const project_edit_data = useSelector(state => state.Reducer1.edit_project_form_data)


    //close form window

    const close_form_window = (e) => {
        set_project_form(false)
        dispatch(set_background_blur(false))
        dispatch(set_project_form_edit_data(''))
    }

    //onchange even handler
    const onchange_event = (e) => {
        handleChange(e)
    }

    //yup validation
    const valid = Yup.object().shape({
        Project_name: Yup.string()
            .required('This field is required'),
        Start_Date: Yup.date()
            .required('This field is required'),
        Ongoing: Yup.boolean(),
        End_Date: Yup.date()
            .when("Ongoing", {
                is: false,
                then: (data) => data.required('This field is required'),
            }),
        Description: Yup.string()
            .trim()
            .max(200, 'exceed the max length'),
        Project_link: Yup.string()
            .matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Enter correct url!'
            )

    })


    //value initilization
    const [initialValues, set_initialValues] = useState(
        {
            Project_name: '',
            Start_Date: '',
            End_Date: '',
            Ongoing: false,
            Description: '',
            Project_link: '',
            id: ''
        }
    )

    useEffect(() => {
        if (project_edit_data) {
            set_initialValues(project_edit_data)
        }
        else {
            set_initialValues(
                {
                    Project_name: '',
                    Start_Date: '',
                    End_Date: '',
                    Ongoing: false,
                    Description: '',
                    Project_link: '',
                    id: ''
                }
            )
            // console.log('old')

        }
    }, [project_edit_data])

    //formik
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            const time = new Date().getTime() // setting a unique key


            if (project_edit_data) {

                const edit = true
                if (profile) {
                    await Submit_project(sendProjectData, value, dispatch, set_React_loader, toast, set_project_form_edit_data, update_project_form_data, set_project_form_data, edit)
                }
                else {
                    dispatch(update_project_form_data(value))
                    dispatch(set_project_form_edit_data(''))

                }
            }
            else {

                const edit = false

                value = { ...value, id: time }
                if (profile) {
                    await Submit_project(sendProjectData, value, dispatch, set_React_loader, toast, set_project_form_edit_data, update_project_form_data, set_project_form_data, edit)
                }
                else {
                    dispatch(set_project_form_data(value))

                }

            }

            set_project_form(false)
            dispatch(set_background_blur(false))
            resetForm()
            // setFieldValue('Ongoing', false)

        },
    })
    return (
        <div className={style.job_form}>

            <center><h3>Projects</h3></center>
            <form className={style.main_box} onSubmit={handleSubmit}>

                <div className={`${style.ed_box} ${style.ed_box2}`}>
                    <label htmlFor="">Project name <b className={input_style.star}>**</b></label>
                    <input type="text"
                        className={input_style.input_fields}
                        onChange={(e) => onchange_event(e)}
                        name="Project_name"
                        value={values.Project_name}
                    />
                    {errors.Project_name && touched.Project_name ? <p className={btn_style.error_div}>{errors.Project_name}</p> : null}

                </div>

                <div
                    className={`${style.ed_box} ${style.ed_box6}`}
                >
                    <label htmlFor="">Start Month <b className={input_style.star}>**</b></label>
                    <input type="date"
                        className={input_style.input_fields}
                        onChange={(e) => onchange_event(e)}
                        name='Start_Date'
                        value={values.Start_Date}

                    />
                    {errors.Start_Date && touched.Start_Date ? <p className={btn_style.error_div}>{errors.Start_Date}</p> : null}

                </div>
                <div
                    className={`${style.ed_box} ${style.ed_box7}`}
                >
                    <label htmlFor="">End Month <b className={input_style.star}>**</b></label>
                    <input type="date"
                        className={input_style.input_fields}
                        onChange={(e) => onchange_event(e)}
                        name='End_Date'
                        value={values.End_Date}
                        disabled={values.Ongoing}
                    />
                    {errors.End_Date && touched.End_Date ? <p className={btn_style.error_div}>{errors.End_Date}</p> : null}

                </div>

                <div
                    className={`${style.ed_box} ${style.ed_box7} ${style.checkbox}`}
                >
                    <input type="checkbox" name="Ongoing" id=""
                        onChange={(e) => onchange_event(e)}
                        value={values.Ongoing}
                        checked={values.Ongoing}
                    />
                    <label htmlFor="">Ongoing</label>
                </div>

                <div className={`${style.ed_box} ${style.textarea}`}>
                    <textarea
                        className={input_style.input_fields}
                        name="Description" id="" cols="50" rows="10"
                        placeholder='Description'
                        onChange={(e) => onchange_event(e)}
                        value={values.Description}
                    />
                    {errors.Description && touched.Description ? <p className={btn_style.error_div}>{errors.Description}</p> : null}

                </div>

                <div className={`${style.ed_box} ${style.ed_box2}`}>
                    <label htmlFor="">Project link <spam className={input_style.star}>(Save in Drive and share the link)</spam> </label>
                    <input type="text"
                        className={input_style.input_fields}
                        onChange={(e) => onchange_event(e)}
                        name="Project_link"
                        value={values.Project_link}
                    />
                    {errors.Project_link && touched.Project_link ? <p className={btn_style.error_div}>{errors.Project_link}</p> : null}


                </div>


                <div
                    className={`${style.ed_box} ${style.btn_box} `}
                >
                    <button

                        className={btn_style.btn}
                        type='submit'
                    >Submit
                    </button>
                </div>



            </form>


            <div className={btn_style.close_icon}

            >
                <b
                    onClick={(e) => { close_form_window(e) }}
                ><i class="bi bi-x-lg"></i></b>
            </div>
        </div>
    )
}

export default Project_form