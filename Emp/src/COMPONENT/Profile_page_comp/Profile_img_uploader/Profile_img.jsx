import React, { useEffect, useState } from 'react';
// import style from '../Resume_comp./Resume_comp.module.css';
import style from '../Resume_uploder/Resume_comp.module.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import btn_style from '../Educ_comp/Education_from/Education_op.module.css';
import img from '../../../assets/box.png';
import { firebaseDb } from '../../../Firebase/Firebase_config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useSelector, useDispatch } from 'react-redux';
import { Document, Page } from 'react-pdf';
import document_img from '../../../assets/document.png'
import { set_user_image } from '../../../REDUX/REDUCER/Emp_reducer'
import { useUploadUserimgMutation } from '../../../REDUX/Api/Sending_data_api';
import { set_React_loader } from '../../../REDUX/REDUCER/Other_reducer';

import { Img_uploader_fn } from '../../../HELPER_FUNCTION/Profile_helper/user_img_uploader.js';

const Profile_img = ({ set_profile_form, set_background_blur }) => {

    const [uploadUserimg] = useUploadUserimgMutation()
    const dispatch = useDispatch()
    const user_id = useSelector((state) => state.Reducer2.User_id);
    const user_img = useSelector((state) => state.Reducer1.user_image);

    const [file, setFile] = useState(null);
    const [file_name, setFile_name] = useState();
    const [file_url, setFile_url] = useState();
    const [error, setError] = useState('');

    useEffect(() => {
        setFile_url(user_img)

    }, [user_img])


    const handleChange = (event) => {
        const uploadedFile = event.target.files[0];

        if (uploadedFile) {
            setFile_name(uploadedFile.name);

            if (uploadedFile.size > 1024 * 1024) {
                setError('Image size cannot exceed 1 MB');
            } else if (
                uploadedFile.type === 'image/png' ||
                uploadedFile.type === 'image/jpeg'
            ) {
                setError('')
                setFile(uploadedFile);
            } else {
                setError('Only PNG/JPG formats are allowed')
            }
        }
    };

    const handleUpload = async () => {
        if (!error) {
            try {

                if (file_name) {
                    const fileRef = ref(firebaseDb, `ProfileImage/${user_id}`);
                    await uploadBytes(fileRef, file);
                    const url = await getDownloadURL(fileRef);
                    await Img_uploader_fn(dispatch, uploadUserimg, file_name, url, set_user_image, set_profile_form, toast, set_background_blur)
                }
                else {
                    toast.error('Select a file.')
                }

            } catch (error) {
                console.log(error)
                toast.error('Try Again');
            }
        }
        else {
            toast.error(error);

        }
    };

    const close_fn = () => {
        dispatch(set_background_blur(false))
        set_profile_form(false)

    }
    return (
        <div className={style.app}>
            <div className={style.parent}>
                <div className={style.uploads}>
                    {
                        file_url ?
                            <>
                                <a href={file_url} target="_blank" rel="noopener noreferrer" > <img src={file_url} alt="img" className={style.img} /></a>

                            </>
                            :
                            <img src={img} alt="img" className={style.img} />

                    }


                    <h5 className={style.name}>{file_name}</h5>
                    {/* {file_name?<br/>:''} */}
                    <div className={style.upload}>
                        <h4>Click here to select image</h4>
                        {error ? <p style={{ color: 'red' }}>{error}</p> : <p>Maximum image size: 1 MB</p>}
                        <input type="file" onChange={handleChange} />
                    </div>
                </div>
            </div>
            <center>
                <button onClick={handleUpload} className={style.btn}>
                    Upload
                </button>
            </center>
            <div className={style.cross}>
                <b onClick={() => { close_fn() }}><i class="bi bi-x-lg"></i></b>
            </div>
        </div>
    );
};

export default Profile_img;
