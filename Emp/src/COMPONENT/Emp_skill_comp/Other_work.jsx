import React, { useRef } from 'react'
import field_style from '../../CONTAINER/Emp_personal/Emp_personal_detail.module.css'
import style from './Skill_box.module.css'
import add_btn from '../../assets/plus.png'
import cross_btn from '../../assets/close.png'

const Other_work = ({values, setFieldValue}) => {

    const input_ref = useRef(null)//take input value

    const save_val_fn = (val) => { //save input data

        let trim_val = val.trim()

        const dublicate_val = values.Other_work.find((val => { return (val === trim_val) }))

        if (trim_val.length !== 0) {

            if (dublicate_val == undefined) {

                setFieldValue('Other_work', [...values.Other_work, input_ref.current.value])
                input_ref.current.value = ''
            }
        }
    }

    // delete other work 
    function delete_work_fn(val) {

        const new_values = values.Other_work.filter(value => { return (value !== val) })
        setFieldValue('Other_work', [...new_values])
    }

    return (
        <>
            {values.Other_work ?
                values.Other_work.map((val, index) => {
                    return (
                        < div className={style.outer_show} key={index} >

                            <input
                                type="text"
                                disabled={true}
                                value={val}
                                className={field_style.input_fields}
                            />
                            <img
                                src={cross_btn}
                                alt="#"
                                className={style.outer_plus_btn}
                                onClick={() => { delete_work_fn(val) }}
                            />
                        </div >
                    )
                }) : ''


            }

            <div className={style.other}>

                <input
                    type="text"
                    className={field_style.input_fields}
                    name='Other_work'
                    ref={input_ref}
                    placeholder='https://www.example.com'
                />

                <img
                    src={add_btn}
                    alt="#"
                    className={style.outer_plus_btn}
                    onClick={() => { save_val_fn(input_ref.current.value) }}
                />
            </div>
        </>
    )
}

export default Other_work