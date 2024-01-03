import React, { useEffect, useState } from 'react';
import style from '../Resume_uploder/Resume_comp.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import btn_style from '../Educ_comp/Education_from/Education_op.module.css';
import img from '../../../assets/box.png';
import { firebaseDb } from '../../../Firebase/Firebase_config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useSelector, useDispatch } from 'react-redux';
import { Document, Page } from 'react-pdf';
import document_img from '../../../assets/document.png'
import { set_Resume_name, set_Resume_url } from '../../../REDUX/REDUCER/Emp_reducer'
import { useUploadResumeMutation } from '../../../REDUX/Api/Sending_data_api';
import { set_React_loader } from '../../../REDUX/REDUCER/Other_reducer';
import { Resume_uploader_fn } from '../../../HELPER_FUNCTION/Profile_helper/resume_uploader.js';

const Tranning_uploader = ({ file, setFile, file_name, setFile_name, error, setError, file_url, values, setFieldValue }) => {

    // const [uploadResume] = useUploadResumeMutation()
    // const dispatch = useDispatch()
    // const user_id = useSelector((state) => state.Reducer2.User_id);


    // const [file, setFile] = useState(null);
    // const [file_name, setFile_name] = useState();
    // const [file_url, setFile_url] = useState();
    // const [error, setError] = useState('');

    // useEffect(() => {
    //     setFile_url(resume_url)
    // }, [resume_url])


    const handleChange = (event) => {
        const uploadedFile = event.target.files[0];

        if (uploadedFile) {
            // setFile_name(uploadedFile.name);
            setFieldValue('file_name', uploadedFile.name)

            if (uploadedFile.size > 1024 * 1024) {
                setError('File size cannot exceed 1 MB');
            } else if (
                uploadedFile.type === 'application/pdf' ||
                uploadedFile.type === 'image/png' ||
                uploadedFile.type === 'image/jpeg'
            ) {
                setError('');
                setFile(uploadedFile);

            } else {
                setError('Only PDF/PNG/JPG formats are allowed')
                setError('Only PDF/PNG/JPG formats are allowed');
            }
        }
    };


    return (
        <div className={style.app}>
            <div className={style.parent}>
                <div className={style.uploads}>
                    {
                        values.document ?
                            <>
                                <a href={values.document} target="_blank" rel="noopener noreferrer" > <img src={document_img} alt="Resume" className={style.img} /></a>
                            </>
                            :
                            <img src={img} alt="Resume" className={style.img} />

                    }
                    <h5 className={style.name}>{values.file_name}</h5>
                    {/* {file_name?<br/>:''} */}
                    <div className={style.upload}>
                        <h4>Click here to select file</h4>
                        {error ? <p style={{ color: 'red' }}>{error}</p> : <p>Maximum file size: 1 MB</p>}
                        <input type="file" onChange={handleChange} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tranning_uploader;
