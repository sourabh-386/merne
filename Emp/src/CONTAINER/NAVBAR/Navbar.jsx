import React, { useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/logo1.png'
import { Link } from 'react-router-dom'
import Profile_window from '../Profile_window/Profile_window'
// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Navbar = ({ set_login }) => {


  const navigate = useNavigate()
  const [profile_window, set_profile_window] = useState(false)
  const Data2 = useSelector(state => state.Reducer4.Data2) //for checking data2
  const Personal_detail = useSelector(state => state.Reducer1.Personal_detail)

  const first = Personal_detail && Personal_detail.First_Name ? Personal_detail.First_Name : ''
  const middle = Personal_detail && Personal_detail.Middle_Name ? Personal_detail.Middle_Name : ''
  const last = Personal_detail && Personal_detail.Last_Name ? Personal_detail.Last_Name : ''
  const email = Personal_detail && Personal_detail.Email ? Personal_detail.Email : ''

  const auth = useSelector(state => state.Reducer4.Authenticated)

  const login_btn = () => {
    if (window.location.href.split('/').slice(-1)[0] == 'demo' ||  window.location.href.split('/').slice(-1)[0] == 'Demo') {
      navigate('/')
    }
    set_login(true)

    // console.log('location', window.location.href.split('/').slice(-1)[0])

  }
  const register_btn = () => {
    if (window.location.href.split('/').slice(-1)[0] == 'demo' ||  window.location.href.split('/').slice(-1)[0] == 'Demo') {

      navigate('/')
    }
    set_login(false)


  }


  return (

    <>
      <div className={style.nav}>
        <img className={style.logo} src={logo} alt="logo" />
        <div className={style.nav_options}>
          <div></div>
          <div className={style.links_div} onMouseLeave={() => { set_profile_window(false) }}>

            {auth && Data2 ? <Link className={`${style.link} ${style.links}`} to="/Home"><p>Jobs</p></Link> : ''}

            {auth && Data2 ? <Link className={`${style.link} ${style.links}`} to="/Demo"><p className={style.name}>About</p></Link> : ''}
            {
              !Data2 && !auth ?
                <>
                  <button className={style.btn} onClick={() => { register_btn() }}><b>Register</b></button>
                  <button className={style.btn} onClick={() => { login_btn() }}><b>Login</b></button>
                </> : ''
            }
            {Data2 && auth ?
              <>
                <div className={style.profile}
                  onMouseEnter={() => { set_profile_window(true) }}
                >
                  <img src="" alt="" /><h4>S</h4>
                  <div
                    onMouseEnter={() => { set_profile_window(true) }}
                    onMouseLeave={() => { set_profile_window(false) }}
                    className={` ${style.Profile} ${profile_window ? '' : style.profile_window_hid}`}>
                    <Profile_window
                      first={first}
                      middle={middle}
                      last={last}
                      email={email}
                    />
                  </div>
                </div>
              </>
              : ''
            }
          </div>
        </div>
      </div>

    </>

  )
}

export default Navbar