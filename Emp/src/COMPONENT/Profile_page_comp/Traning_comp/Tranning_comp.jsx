import React from 'react'
import style2 from '../Educ_comp/Educ_comp.module.css'
import { useSelector, useDispatch } from 'react-redux'
import btn_style from '../../../COMPONENT/EMP_DETAILS_COMP/Education_option/Education_op.module.css'
import {
    set_tranning_form_data_delete,
    set_tranning_form_edit_data
} from '../../../REDUX/REDUCER/Emp_reducer'
import { getMonthName } from '../../../HELPER_FUNCTION/Normal_function'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { firebaseDb } from '../../../Firebase/Firebase_config'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';






import { useDeleteTranningDataMutation } from '../../../REDUX/Api/Sending_data_api'
import { set_React_loader } from '../../../REDUX/REDUCER/Other_reducer'

const Tranning_comp = ({ set_tranning_form, set_background_blur }) => {

    const dispatch = useDispatch()
    const [deleteTranningData] = useDeleteTranningDataMutation()
    const user_id = useSelector((state) => state.Reducer2.User_id);

    const data = useSelector(state => state.Reducer1)// getting user data
    const tranning_form_data = data.tranning_form_data


    const edit_fn = (value) => {
        dispatch(set_tranning_form_edit_data(value))
        set_tranning_form(true)
    }

    const del_fn = async (value) => {
        try {
            dispatch(set_React_loader(true))

            if (value.document) {
                const fileRef = ref(firebaseDb, `/Documents/${user_id}/${value.id}`);
                await deleteObject(fileRef);
            }
            const res = await deleteTranningData(value.id)


            dispatch(set_React_loader(false))


            if (res.data) {
                toast.success(res.data.val)
                dispatch(set_tranning_form_data_delete(value.id))

            }
            if (res.error) {
                toast.error(res.error.data.val)
            }


        } catch (error) {
            console.log(error)
            dispatch(set_React_loader(false))
            toast.error('Something went wrong')

        }

        // dispatch(set_tranning_form_data_delete(value.id))
    }

    const add_fn = () => {
        dispatch(set_background_blur(true))
        set_tranning_form(true)

    }


    return (
        <div className={style2.education} >
            <div className={style2.outer}>
                <h3 className={style2.main_head}>Tranning/ Courses</h3>
                <div className={style2.add}>

                    <button onClick={() => { add_fn() }} ><b>+ Tranning/ Courses</b></button>

                </div>
            </div>

            {
                tranning_form_data.length > 0 ?
                    tranning_form_data.map(value => {
                        return (
                            <div>
                                <p className={style2.btn_box}>
                                    <b>{value.Program_name}</b>
                                    <div>
                                        <div className={style2.edit_btn} onClick={() => { edit_fn(value) }}><b><i class="bi bi-pencil-square"></i></b></div>
                                        <div className={style2.del_btn} onClick={() => { del_fn(value) }}><b><i class="bi bi-trash"></i></b></div>
                                    </div>
                                </p>
                                <p>{value.Organisation ? value.Organisation.toUpperCase() : ""} </p>
                                <p>{getMonthName(value.Start_Date)} - {value.Ongoing ? 'Present' : getMonthName(value.End_Date)}</p>
                                <p>({value.Online ? `Online` : value.Location})</p>

                                <br />

                            </div>

                        )
                    })
                    : ''

            }


        </div>
    )
}

export default Tranning_comp