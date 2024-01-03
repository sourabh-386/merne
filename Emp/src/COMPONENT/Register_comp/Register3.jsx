import { React, useState } from 'react'
import style from './Main.module.css'
import field_style from '../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { set_create_account_details } from '../../REDUX/REDUCER/Login_reducer'




const Register3 = () => {

  const dispatch = useDispatch()

  const set_data_fn = (name, value) => {
    dispatch(set_create_account_details({ 'name': name, 'value': value }))
  }

  const field_data = useSelector(state => state.Reducer2.create_account_details)

  const [eye1, set_eye1] = useState(false) //set password type
  const [eye2, set_eye2] = useState(false) //set confirm password type

  //toggle password type 

  const password_type_toggel = (value) => {

    if (value == 2) {
      set_eye2(!eye2)
    }
    else {
      set_eye1(!eye1)

    }
  }

  return (
    <div className={style.register1}>
      <table width='100%' className={style.table}>
        <tr>
          <td colSpan='2'>

            <input type="Email"
              className={field_style.input_fields}
              placeholder='Email'
              name='Email'
              value={field_data[7].Email}
              onChange={(e) => { set_data_fn('Email', e.target.value) }}
            />
          </td>
        </tr>
        <tr>
          <td >
            <div className={style.password_box}>
              <input
                type={eye1 ? 'text' : "Password"}
                name="Password" id=""
                className={field_style.input_fields}
                placeholder='Password'
                value={field_data[8].Password}
                onChange={(e) => { set_data_fn('Password', e.target.value) }}
              />
              <p
                onClick={() => { password_type_toggel(1) }}
                className={style.eye}><i class="bi bi-eye-fill"></i></p>

            </div>

          </td>

          <td>
            <div className={style.password_box}>
              <input
                type={eye2 ? 'text' : "Password"}
                name="confirm_Password" id=""
                className={field_style.input_fields}
                placeholder='Confirm Password'
                value={field_data[9].confirm_Password}
                onChange={(e) => { set_data_fn('confirm_Password', e.target.value) }}

              />
              <p
                onClick={() => { password_type_toggel(2) }}
                className={style.eye}><i class="bi bi-eye-fill"></i></p>
            </div>

          </td>

        </tr>
        <tr>

        </tr>
        <tr>
          <td colSpan='2'>
            <center>
              <span className={style.checkbox}>
                <input
                  type="checkbox"
                  name="Agree" id=""
                  value={field_data[10].Agree}
                  onChange={(e) => { set_data_fn("Agree", e.target.checked) }}
                />
                <p>Agreed Term & Condition</p>
              </span>
            </center>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default Register3