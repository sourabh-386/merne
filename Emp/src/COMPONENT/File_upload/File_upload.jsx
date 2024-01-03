import React, { useState } from 'react'
import style from './File_upload.module.css'
// import { set_Resume } from '../../REDUX/REDUCER/Emp_reducer'
import { useDispatch, useSelector } from 'react-redux'


const File_upload = ({ set_resume,set_file }) => {


    // const [resume,set_resume]=useState()
    const dispatch = useDispatch()

    const onchange_event_fn = (e) => {



        // const formData = new FormData();
        // formData.append('file', e.currentTarget.files[0])
        // dispatch(set_Resume(formData))

        
        set_file()

    }

    // console.log(file)
    return (
        <div className={style.file}>

            <input
                type="file"
                name="resume"
                accept=".jpg, .jpeg, .png, .pdf, .doc, .docx, image/*"
                onChange={(e) => { set_resume(e.currentTarget.files[0]) }}
                className={style.inputfile}
            />

            <input
                type="file"
                name="file"
                accept=".jpg, .jpeg, .png, .pdf, .doc, .docx, image/*"
                onChange={(e) => { set_file(e.currentTarget.files) }}
                multiple
                className={style.inputfile}
            />
        </div>
    )
}

export default File_upload