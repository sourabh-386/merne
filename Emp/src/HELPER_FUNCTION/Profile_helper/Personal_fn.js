const Submit_personal = async (sendData, value, dispatch, set_React_loader, set_personal_detail, toast,) => {

    try {
        dispatch(set_React_loader(true))
        const res = await sendData(value)
        dispatch(set_React_loader(false))

        if (res.data) {

            toast.success(res.data.val)
            dispatch(set_personal_detail(value))

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
    Submit_personal
}