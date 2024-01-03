




const Submit_tranning = async (error, file, setFile, ref, firebaseDb, user_id, id, uploadBytes, getDownloadURL, toast, new_value, dispatch, set_tranning_form_data, set_React_loader, sendTranningData, tranning_edit_data, update_tranning_form_data, set_tranning_form_edit_data) => {

    try {

        if (!error) {

            try {

                if (file) {

                    const fileRef = ref(firebaseDb, `/Documents/${user_id}/${id}`);

                    await uploadBytes(fileRef, file);

                    const url = await getDownloadURL(fileRef);

                    const res = await sendTranningData({ ...new_value, document: url });

                    if (res.data) {

                        toast.success(res.data.val)

                        if (tranning_edit_data) {

                            dispatch(set_tranning_form_edit_data(''))

                            dispatch(update_tranning_form_data(new_value))

                        }
                        else { dispatch(set_tranning_form_data({ ...new_value, document: url })) }
                    }
                    if (res.error) { toast.error(res.error.data.val) }
                }
                else {
                    const res = await sendTranningData(new_value);

                    if (res.data) {

                        toast.success(res.data.val)

                        if (tranning_edit_data) {

                            dispatch(set_tranning_form_edit_data(''))

                            dispatch(update_tranning_form_data(new_value))

                        }
                        else { dispatch(set_tranning_form_data(new_value)) }
                    }
                    if (res.error) { toast.error(res.error.data.val) }
                }
                setFile('')

            } catch (err) { toast.error('Try Again') }
        }
        else { toast.error(error) }


    } catch (error) { toast.error('Something went wrong') }

}

export { Submit_tranning }