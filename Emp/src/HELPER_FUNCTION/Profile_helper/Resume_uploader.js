
const Resume_uploader_fn = async (dispatch, uploadResume, file_name, url, set_Resume_name, set_Resume_url, set_resume_form, toast,set_background_blur) => {

    // console.log('2')

    try {
        const res = await uploadResume({ name: file_name, url: url })

        if (res.data) {
            toast.success(res.data.val)
            dispatch(set_Resume_name(file_name))
            dispatch(set_Resume_url(url))
            dispatch(set_background_blur(false))
            set_resume_form(false)

        }
        else if (res.error) {
            toast.error(res.error.data.val)
        }

    } catch (error) {
        console.log(error)
        toast.error('Try again')

    }

}


export {
    Resume_uploader_fn
}