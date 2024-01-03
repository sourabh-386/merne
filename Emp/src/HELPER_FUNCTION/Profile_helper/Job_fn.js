const Submit_job = async (sendJobData, value, dispatch, set_React_loader, toast, set_job_form_edit_data, update_job_form_data, set_job_form_data, edit) => {

    try {
        dispatch(set_React_loader(true))
        const res = await sendJobData(value)
        dispatch(set_React_loader(false))

        if (res.data) {

            toast.success(res.data.val)

            if (edit) {
                dispatch(update_job_form_data(value))
                dispatch(set_job_form_edit_data(''))
            }
            else {
                dispatch(set_job_form_data(value))
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
    Submit_job
}