import { useState } from 'react'
import './App.css'
import Emp_details from './PAGES/EMP_DETAILS/Emp_details'
import Background_blur from './COMPONENT/Backgroun_blur/Background_blur'
import Education_op from './COMPONENT/EMP_DETAILS_COMP/Education_option/Education_op'
import { useSelector, useDispatch } from 'react-redux'
import LoginPage from './PAGES/LoginPage/LoginPage'
import Demo from './PAGES/Demo/Demo'
import { Routes, Route } from "react-router-dom"
import Password_reset from './PAGES/Password_reset_page/Password_reset'
import ReactLoading from "react-loading"
import { setIsAuthenticated } from './REDUX/REDUCER/Api_response_reducer'
import { useEffect } from 'react'
import Home from './PAGES/Home/Home'
import Navbar from './CONTAINER/NAVBAR/Navbar'
import Sucesspage from './COMPONENT/Third_party_auth/Sucess_page/Sucesspage'
import Profile from './PAGES/Profile/Profile'
import { set_background_blur } from './REDUX/REDUCER/Emp_reducer'
import { set_React_loader } from './REDUX/REDUCER/Other_reducer'
import Footer from './CONTAINER/Footer/Footer'
import CopyrightPage from './PAGES/Copyright/Copyright'
import Job_detail from './PAGES/Job_detail/Job_detail'
function App() {

  const [page, setpage] = useState()
  const dispatch = useDispatch()

  const back_blur = useSelector(state => state.Reducer1.background_blur) //for making page blur
  const React_loader_icon = useSelector(state => state.Reducer3.React_loader) //for showing loader on screen
  const autorized = useSelector(state => state.Reducer4.Authenticated) //for authorization
  const Data1 = useSelector(state => state.Reducer4.Data1) //for checking data1
  const Data2 = useSelector(state => state.Reducer4.Data2) //for checking data2

  // console.log(Data2)
  useEffect(() => {

    dispatch(set_background_blur(false))
    dispatch(set_React_loader(false))

  }, [])

  const [login, set_login] = useState(false)



  return (

    <div className='top_div'>
      <>
        {
          back_blur ?
            <>
              <Background_blur />
            </>
            : ""
        }
        {React_loader_icon ?
          <div className='react_loader'>
            <ReactLoading type="spokes" color="#0000FF"
              height={100} width={60} />
          </div>
          : ''
        }

        {/* //navbar  */}
        <div className='comp'>
          <Navbar set_login={set_login} />
        </div>
        <div className='comp'>


          <Routes>

            <Route path='/' element={autorized ? Data2 ? <Home /> : <Emp_details /> : <LoginPage login={login} set_login={set_login} />} />

            <Route path='/form' element={autorized ? Data2 ? <Home /> : <Emp_details /> : <LoginPage login={login} set_login={set_login} />} />

            <Route path='/home' element={autorized ? Data2 ? <Home /> : <Emp_details /> : <LoginPage login={login} set_login={set_login} />} />

            {
              Data2 ? <Route path="/userProfile" element={<Profile />} /> : ''
            }

            <Route path="/job/:job_id" element={<Job_detail />} />

            <Route path="/demo" element={<Demo />} />

            <Route path="/copyrightPolicies" element={<CopyrightPage />} />

            <Route path="/Login/Sucessfull" element={<Sucesspage />} />

            <Route path="/reset/:email/:token" element={<Password_reset />} />

          </Routes>
        </div>



      </>


    </div>

  )
}

export default App
