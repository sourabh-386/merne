import React from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import field_style from '../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import style from './Main.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { set_create_account_details } from '../../REDUX/REDUCER/Login_reducer'

const Register2 = () => {

    const dispatch = useDispatch()
    
    const set_data_fn = (name, value) => {
        dispatch(set_create_account_details({ 'name': name, 'value': value }))
    }

    const field_data = useSelector(state => state.Reducer2.create_account_details)


    return (
        <div className={style.Register1} >
            <table width='100%' className={style.table}>
                <tr>
                    <td width='100%'>
                        <input type="text"
                            className={field_style.input_fields}
                            placeholder='First_name'
                            name='First_name'
                            value={field_data[4].First_name}
                            onChange={(e) => { set_data_fn('First_name', e.target.value) }}
                        />
                    </td>
                </tr>
                <tr>
                    <td width='100%'>
                        <input type="text"
                            className={field_style.input_fields}
                            placeholder='Last_name'
                            name='Last_name'
                            value={field_data[5].Last_name}
                            onChange={(e) => { set_data_fn('Last_name', e.target.value) }}
                        />

                    </td>
                </tr>
                <tr>
                    <div className={field_style.input_fields}>
                        <PhoneInput
                            placeholder="Enter phone number"
                            className={field_style.my_phone_input}
                            value={field_data[6].Phone}
                            onChange={(value, data, event, formattedValue) => {
                                set_data_fn('Phone', value)
                            }}
                            name="Phone"


                        />
                    </div>
                </tr>

            </table>
        </div>
    )
}

export default Register2