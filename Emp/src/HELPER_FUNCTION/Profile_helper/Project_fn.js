const Submit_project = async (sendProjectData, value, dispatch, set_React_loader, toast, set_project_form_edit_data, update_project_form_data, set_project_form_data, edit) => {

    try {
        dispatch(set_React_loader(true))
        const res = await sendProjectData(value)
        dispatch(set_React_loader(false))

        if (res.data) {

            toast.success(res.data.val)

            if (edit) {
                dispatch(update_project_form_data(value))
                dispatch(set_project_form_edit_data(''))
            }
            else {
                dispatch(set_project_form_data(value))
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
    Submit_project
}