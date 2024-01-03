const Submit_skill = async (sendskillData, value, dispatch, set_React_loader, toast, add_skills) => {

    try {
        dispatch(set_React_loader(true))
        const res = await sendskillData(value)
        dispatch(set_React_loader(false))

        if (res.data) {

            toast.success(res.data.val)
            dispatch(add_skills(value))

        }
        if (res.error) { toast.error(res.error.data.val) }


    } catch (error) {
        dispatch(set_React_loader(false))
        console.log('error', error)
        toast.error('Something went wrong')
    }

}

export {
    Submit_skill
}