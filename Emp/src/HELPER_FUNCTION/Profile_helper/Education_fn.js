const Submit_education = async (sendeducationData, value, dispatch, set_React_loader, toast, set_education_form_edit_data, update_education_form_data, set_education_form_data, edit) => {

    try {
        dispatch(set_React_loader(true))
        const res = await sendeducationData(value)
        dispatch(set_React_loader(false))

        if (res.data) {

            toast.success(res.data.val)

            if (edit) {
                dispatch(update_education_form_data(value))
                dispatch(set_education_form_edit_data(''))
            }
            else {
                dispatch(set_education_form_data(value))
            }

        }
        if (res.error) { toast.error(res.error.data.val) }


    } catch (error) {
        dispatch(set_React_loader(false))
        console.log('error', error)
        toast.error('Something went wrong')
    }

    // console.log('dd',value)

}

export {
    Submit_education
}