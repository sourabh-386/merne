



// open couse form  

const course_form_open = (dispatch, set_graduation_window, set_background_blur) => {
    dispatch(set_graduation_window(true))
    dispatch(set_background_blur(true))
}
const course_form_open2 = (dispatch, set_class_12_window, set_background_blur) => {
    dispatch(set_class_12_window(true))
    dispatch(set_background_blur(true))

}
const course_form_open3 = (dispatch, set_class_10_window, set_background_blur) => {
    dispatch(set_class_10_window(true))
    dispatch(set_background_blur(true))

}
const course_form_open4 = (dispatch, set_diploma_window, set_background_blur) => {
    dispatch(set_diploma_window(true))
    dispatch(set_background_blur(true))

}
const course_form_open5 = (dispatch, set_phd_window, set_background_blur) => {
    dispatch(set_phd_window(true))
    dispatch(set_background_blur(true))
}


// close course form 

const course_form_close = (dispatch, set_graduation_window, set_background_blur) => {
    dispatch(set_graduation_window(false))
    dispatch(set_background_blur(false))
}
const course_form_close2 = (dispatch, set_class_12_window, set_background_blur) => {
    dispatch(set_class_12_window(false))
    dispatch(set_background_blur(false))

}
const course_form_close3 = (dispatch, set_class_10_window, set_background_blur) => {
    dispatch(set_class_10_window(false))
    dispatch(set_background_blur(false))

}
const course_form_close4 = (dispatch, set_diploma_window, set_background_blur) => {
    dispatch(set_diploma_window(false))
    dispatch(set_background_blur(false))

}
const course_form_close5 = (dispatch, set_phd_window, set_background_blur) => {
    dispatch(set_phd_window(false))
    dispatch(set_background_blur(false))

}

const close_education_op = (dispatch, set, set_background_blur) => {
    dispatch(set(false))
    dispatch(set_background_blur(false))
}

const close_education_op2 = (dispatch, set, set_background_blur) => {
    dispatch(set_phd_window(false))
    dispatch(set_background_blur(false))
}


export {
   
    course_form_open,
    course_form_open2,
    course_form_open3,
    course_form_open4,
    course_form_open5,
    course_form_close,
    course_form_close2,
    course_form_close3,
    course_form_close4,
    course_form_close5,
    close_education_op,
    close_education_op2

}
