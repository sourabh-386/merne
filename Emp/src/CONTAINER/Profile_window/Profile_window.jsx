import React from 'react'
import style from './Profile_window.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { persistor } from '../../REDUX/STORE/Store.jsx'  // Import the persistor
import { setIsAuthenticated } from '../../REDUX/REDUCER/Api_response_reducer'

const Profile_window = ({ first, middle, last, email }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout_fn = () => {

        dispatch(setIsAuthenticated(false))
        navigate('./form')
        persistor.pause();
        persistor.flush().then(() => {
            return persistor.purge();
        });


        // Delete all cookies
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
        window.location.reload();

    }

    return (
        <div className={style.profile}>
            <div>
                <p><b>{first} {middle} {last}</b></p>
                <p>{email}</p>
            </div>
            <hr />
            <div className={style.links}>
                <Link className={`${style.link} ${style.links}`} to="/userProfile"><p>Profile</p></Link>
            </div>

            <hr />
            <div className={style.btn}>
                <button onClick={() => { logout_fn() }} ><b >Logout</b></button>
            </div>
        </div>
    )
}

export default Profile_window