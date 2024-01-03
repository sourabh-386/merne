import React from 'react'
import style from './Link_comp.module.css'
import style2 from '../Educ_comp/Educ_comp.module.css'
import { useDispatch, useSelector } from 'react-redux'

const Link_comp = ({ set_link_form, set_background_blur }) => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.Reducer1)// getting user data
    const Links = data.Links //Link detail
    const other_link = Links[3].Other_work

    const edit_fn = () => {
        dispatch(set_background_blur(true))
        set_link_form(true)
    }



    return (
        <div>
            <div className={style.portfolio}>

                <div className={style2.outer}>
                    
                    <h3 className={style2.main_head}>Portfolio</h3>

                    <div className={style2.add}>

                        <button onClick={() => { edit_fn() }} ><b>+ Work Sample</b></button>

                    </div>
                </div>

                {
                    Links[0].Github_Profile ?

                        <div className={style2.education}>
                            <p className={style2.btn_box}>
                                <b>Github profile</b>
                                <div>
                                    {/* <div className={style2.edit_btn} onClick={() => { edit_fn(value) }}><b onClick={() => { edit_fn() }} ><i class="bi bi-pencil-square"></i></b></div> */}
                                    {/* <div className={style2.del_btn} onClick={() => { del_fn('Github_Profile') }}><b><i class="bi bi-trash"></i></b></div> */}
                                </div>
                            </p>
                            <p><a href={Links[0].Github_Profile}>{Links[0].Github_Profile}</a></p>
                            <br />
                        </div>
                        : ''

                }

                {
                    Links[1].Linkdin_Profile ?

                        <div className={style2.education}>
                            <p className={style2.btn_box}>
                                <b>Linkedin profile</b>
                                <div>
                                    {/* <div className={style2.edit_btn} onClick={() => { edit_fn(value) }}><b onClick={() => { edit_fn() }} ><i class="bi bi-pencil-square"></i></b></div> */}
                                    {/* <div className={style2.del_btn} onClick={() => { del_fn('Linkdin_Profile') }}><b><i class="bi bi-trash"></i></b></div> */}
                                </div>
                            </p>
                            <p><a href={Links[1].Linkdin_Profile}>{Links[1].Linkdin_Profile}</a></p>
                            <br />

                        </div>
                        : ''

                }

                {
                    Links[2].Portfolio_link ?

                        <div className={style2.education}>
                            <p className={style2.btn_box}>
                                <b>Portfolio profile</b>
                                <div>
                                    {/* <div className={style2.edit_btn} onClick={() => { edit_fn(value) }}><b onClick={() => { edit_fn() }} ><i class="bi bi-pencil-square"></i></b></div> */}
                                    {/* <div className={style2.del_btn} onClick={() => { del_fn('Portfolio_link') }}><b><i class="bi bi-trash"></i></b></div> */}
                                </div>
                            </p>
                            <p><a href={Links[2].Portfolio_link}>{Links[2].Portfolio_link}</a></p>
                            <br />

                        </div>
                        : ''
                }

            </div>

            <div className={style2.education}>
                {other_link.length !== 0 ?
                    <>
                        <hr />
                        <br />

                        <h3 className={style2.main_head}>Other work sample</h3>
                        <br />
                    </>
                    : ''
                }
                {
                    other_link.length !== 0 ?
                        other_link.map((val, index) => {
                            return (
                                <>
                                    <div className={style2.btn_box} >
                                        <p key={index}><b>Link {index + 1} - </b><a href={val}>{val}</a></p>
                                        <div>
                                            {/* <div className={style2.edit_btn} onClick={() => { edit_fn(value) }}><b onClick={() => { edit_fn() }} ><i class="bi bi-pencil-square"></i></b></div> */}
                                            {/* <div className={style2.del_btn} onClick={() => { del_fn(value) }}><b><i class="bi bi-trash"></i></b></div> */}
                                        </div>
                                    </div>
                                    <br />
                                </>
                            )
                        })
                        : ''
                }
            </div>

        </div>
    )
}

export default Link_comp