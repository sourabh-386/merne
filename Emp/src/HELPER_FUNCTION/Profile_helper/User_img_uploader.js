
const Img_uploader_fn = async (dispatch, uploadUserimg, file_name, url, set_user_image, set_profile_form, toast, set_background_blur) => {

    // console.log('2')

    try {
        const res = await uploadUserimg({ name: file_name, url: url })

        if (res.data) {
            toast.success(res.data.val)
            dispatch(set_user_image(url))
            dispatch(set_background_blur(false))
            set_profile_form(false)

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
    Img_uploader_fn
}