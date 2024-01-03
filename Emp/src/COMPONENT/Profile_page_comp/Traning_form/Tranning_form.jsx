import { React, useState, useEffect } from 'react'
import style_main from './Tranning_form.module.css'
import style from '../../../COMPONENT/EMP_DETAILS_COMP/Job_form/Job_form.module.css'
import input_style from '../../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import btn_style from '../../../COMPONENT/EMP_DETAILS_COMP/Education_option/Education_op.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
    set_tranning_form_data,
    set_tranning_form_data_delete,
    set_tranning_form_edit_data,
    update_tranning_form_data
} from '../../../REDUX/REDUCER/Emp_reducer'

import { useSelector, useDispatch } from 'react-redux'
import Resume_comp from '../Resume_uploder/Resume_comp'
import Tranning_uploader from '../Traning_doc_uploader/Traning_uploader'
import { Submit_tranning } from '../../../HELPER_FUNCTION/Profile_helper/Tranning_fn'
import { firebaseDb } from '../../../Firebase/Firebase_config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { set_React_loader } from '../../../REDUX/REDUCER/Other_reducer'
import { useSendTranningDataMutation } from '../../../REDUX/Api/Sending_data_api'


const Tranning_form = ({ set_tranning_form, set_background_blur, dispatch }) => {

    // const dispatch = useDispatch()
    const [sendTranningData] = useSendTranningDataMutation()
    const user_id = useSelector((state) => state.Reducer2.User_id);

    ///////////////////file data
    const [file, setFile] = useState(null);
    const [file_name, setFile_name] = useState();
    const [file_url, setFile_url] = useState();
    const [error, setError] = useState('');
    //////////////////

    const tranning_edit_data = useSelector(state => state.Reducer1.edit_tranning_form_data)
    //close form window

    const close_form_window = (e) => {
        set_tranning_form(false)
        dispatch(set_background_blur(false))
        dispatch(set_tranning_form_edit_data(''))
    }

    //onchange even handler
    const onchange_event = (e) => {
        handleChange(e)
    }

    //yup validation
    const valid = Yup.object().shape({

        Program_name: Yup.string()
            .required('This field is required'),
        Organisation: Yup.string()
            .required('This field is required'),
        Start_Date: Yup.date()
            .required('This field is required'),
        Ongoing: Yup.boolean(),
        End_Date: Yup.date()
            .when("Ongoing", {
                is: false,
                then: (data) => data.required('This field is required'),
            }),
        Online: Yup.boolean(),
        Location: Yup.string()
            .when("Online", {
                is: false,
                then: (data) => data.min(4).max(50).required('This field is required'),
            }),
        Description: Yup.string()
            .trim()
            .max(200, 'exceed the max length')
    })


    //value initilization
    const [initialValues, set_initialValues] = useState(

        {
            Program_name: '',
            Organisation: '',
            Start_Date: '',
            End_Date: '',
            Ongoing: false,
            Online: false,
            Location: '',
            Description: '',
            file_name: '',
            document: '',
            id: ''
        }
    )

    useEffect(() => {
        if (tranning_edit_data) {
            set_initialValues(tranning_edit_data)
        }
        else {
            set_initialValues(
                {
                    Program_name: '',
                    Organisation: '',
                    Start_Date: '',
                    End_Date: '',
                    Ongoing: false,
                    Online: false,
                    Location: '',
                    Description: '',
                    file_name: '',
                    document: '',
                    id: ''
                }
            )

        }
    }, [tranning_edit_data])

    //formik
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: valid,
        onSubmit: async (value, { resetForm }) => {

            const time = new Date().getTime() // setting a unique key

            if (tranning_edit_data) {

                try {
                    let id = value.id
                    let new_value = value

                    dispatch(set_React_loader(true))
                    await Submit_tranning(error, file, setFile, ref, firebaseDb, user_id, id, uploadBytes, getDownloadURL, toast, new_value, dispatch, set_tranning_form_data, set_React_loader, sendTranningData, tranning_edit_data, update_tranning_form_data, set_tranning_form_edit_data)
                    dispatch(set_React_loader(false))


                    // dispatch(update_tranning_form_data(value))
                    // dispatch(set_tranning_form_edit_data(''))

                } catch (error) {
                    alert(error)
                }

            }
            else {

                // console.log(value)
                let id = time
                let new_value = { ...value, id: time }

                dispatch(set_React_loader(true))
                await Submit_tranning(error, file, setFile, ref, firebaseDb, user_id, id, uploadBytes, getDownloadURL, toast, new_value, dispatch, set_tranning_form_data, set_React_loader, sendTranningData)
                dispatch(set_React_loader(false))

            }

            set_tranning_form(false)
            dispatch(set_background_blur(false))
            resetForm()

        },
    })

    return (
        <div className={style.job_form}>

            <center><h3>Tranning / Courses</h3></center>
            <form className={style.main_box} onSubmit={handleSubmit}>

                <div className={`${style.ed_box} ${style.ed_box2}`}>
                    <label htmlFor="">Tranning / Course <b className={input_style.star}>**</b></label>
                    <input type="text"
                        className={input_style.input_fields}
                        onChange={(e) => onchange_event(e)}
                        name="Program_name"
                        value={values.Program_name}
                    />
                    {errors.Program_name && touched.Program_name ? <p className={btn_style.error_div}>{errors.Program_name}</p> : null}
                </div>

                <div className={`${style.ed_box} ${style.ed_box2}`}>
                    <label htmlFor="">Organisation <b className={input_style.star}>**</b></label>
                    <input type="text"
                        className={input_style.input_fields}
                        onChange={(e) => onchange_event(e)}
                        name="Organisation"
                        value={values.Organisation}
                    />
                    {errors.Organisation && touched.Organisation ? <p className={btn_style.error_div}>{errors.Organisation}</p> : null}
                </div>

                <div className={`${style.ed_box} ${style.ed_box6}`}>
                    <label htmlFor="">Start Month <b className={input_style.star}>**</b></label>
                    <input type="date"
                        className={input_style.input_fields}
                        onChange={(e) => onchange_event(e)}
                        name='Start_Date'
                        value={values.Start_Date}
                    />
                    {errors.Start_Date && touched.Start_Date ? <p className={btn_style.error_div}>{errors.Start_Date}</p> : null}

                </div>
                <div className={`${style.ed_box} ${style.ed_box7}`}>
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

                <div className={`${style.ed_box} ${style.ed_box7} ${style.checkbox}`}>
                    <input type="checkbox" name="Ongoing" id=""
                        onChange={(e) => onchange_event(e)}
                        value={values.Ongoing}
                        checked={values.Ongoing}
                    />
                    <label htmlFor="">Ongoing</label>
                </div>


                <div className={`${style.ed_box} ${style.ed_box2}`}>
                    <label htmlFor="">Location <b className={input_style.star}>**</b></label>
                    <input type="text"
                        className={input_style.input_fields}
                        onChange={(e) => onchange_event(e)}
                        name="Location"
                        value={values.Location}
                        disabled={values.Online}
                    />
                    {errors.Location && touched.Location ? <p className={btn_style.error_div}>{errors.Location}</p> : null}
                </div>

                <div className={`${style.ed_box} ${style.ed_box2} ${style.checkbox}`}>
                    <input type="checkbox" name="Online" id=""
                        onChange={(e) => onchange_event(e)}
                        value={values.Online}
                        checked={values.Online}

                    />
                    <label htmlFor="">Online</label>
                </div>

                <div className={`${style.ed_box} ${style.textarea}`}>
                    <textarea
                        className={input_style.input_fields}
                        name="Description" id="" cols="50" rows="10"
                        placeholder='Description (Optional)'
                        onChange={(e) => onchange_event(e)}
                        value={values.Description}
                    />
                    {errors.Description && touched.Description ? <p className={btn_style.error_div}>{errors.Description}</p> : null}

                </div>

                <div className={`${style.ed_box} ${style.ed_box2}`}>
                    <label htmlFor="">Document / Certificate <i className='optional'>(Optional)</i> </label>
                    {/* <input type="file"
                        className={input_style.input_fields}
                        onChange={(e) => onchange_event(e)}
                    /> */}
                    <Tranning_uploader
                        file={file}
                        setFile={setFile}
                        file_name={file_name}
                        setFile_name={setFile_name}
                        error={error}
                        setError={setError}
                        file_url={file_url}
                        values={values}
                        setFieldValue={setFieldValue}
                    />
                </div>

                <div className={`${style.ed_box} ${style.btn_box} `} >
                    <button className={btn_style.btn} type='submit'>Submit</button>
                    <ToastContainer
                        autoClose={1500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    // theme="colord"
                    />
                </div>

            </form>

            <div className={btn_style.close_icon}>
                <b onClick={(e) => { close_form_window(e) }}><i class="bi bi-x-lg"></i></b>
            </div>

        </div>
    )
}


export default Tranning_form