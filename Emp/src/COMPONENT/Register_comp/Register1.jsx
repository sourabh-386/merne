import React from 'react'
import style from './Main.module.css'
import field_style from '../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import Select from 'react-select'
import { customDropdownIndicator, customStyles, options1, Expected_CTC, Current_CTC } from '../../HELPER_FUNCTION/Login_helper'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { set_create_account_details } from '../../REDUX/REDUCER/Login_reducer'

const Register1 = () => {

    const dispatch = useDispatch()

    const set_data_fn = (name, value) => {
        dispatch(set_create_account_details({ 'name': name, 'value': value }))
    }

    const field_data = useSelector(state => state.Reducer2.create_account_details)
    // console.log(field_data[0].Work)
    return (
        <div className={style.register1}>
            <table width='100%' className={style.table}>
                <tr>
                    <td colSpan='2'>
                        < Select
                            placeholder='What You Do...'
                            options={options1}
                            className={`${style._register_1och9_1} ${style.__register_1och9_1_jduwc_51}`}
                            styles={customStyles}
                            value={field_data[0].Work}
                            components={{ DropdownIndicator: customDropdownIndicator }}
                            name='Work'
                            onChange={(value, data, event, formattedValue, e) => {
                                set_data_fn(data.name, value)
                            }}

                        />
                    </td>
                </tr>
                <tr>
                    <td width='50%'>
                        < Select
                            placeholder='Current CTC'
                            options={Current_CTC}
                            className={`${style._register_1och9_1} ${style.__register_1och9_1_jduwc_51}`}
                            styles={customStyles}
                            value={field_data[1].Current_CTC}
                            components={{ DropdownIndicator: customDropdownIndicator }}
                            name='Current_CTC'
                            onChange={(value, data, event, formattedValue, e) => {
                                set_data_fn(data.name, value)
                            }}
                        />

                    </td>
                    <td width='50%'>
                        < Select
                            placeholder='Expected CTC'
                            options={Expected_CTC}
                            className={`${style._register_1och9_1} ${style.__register_1och9_1_jduwc_51}`}
                            styles={customStyles}
                            value={field_data[2].Expected_CTC}
                            components={{ DropdownIndicator: customDropdownIndicator }}
                            name='Expected_CTC'
                            onChange={(value, data, event, formattedValue, e) => {
                                set_data_fn(data.name, value)
                            }}
                        />

                    </td>
                </tr>
                <tr>
                    <td colSpan='2'>
                        <input
                            className={field_style.input_fields}
                            placeholder='Desired Job'
                            type="text"
                            value={field_data[3].Desired_Job}
                            name='Desired_Job'
                            onChange={(e) => {
                                set_data_fn('Desired_Job', e.target.value)
                            }}
                        />

                    </td>
                </tr>

            </table>
        </div>
    )
}

export default Register1