//creating new user and also validate user login inputs

import { isStrongPassword } from "./Login_helper"

import { isValidEmail } from "./Login_helper"

const send_sign_data = async (login_page, input_data, set_login_page, addData, navigate, dispatch, set_React_loader, setIsAuthenticated, set_User_id, toast) => {

    if (login_page == 1) {
        if (
            input_data[0].Work !== '' &&
            input_data[1].Current_CTC !== '' &&
            input_data[2].Expected_CTC !== '' &&
            input_data[3].Desired_Job.trim() !== '') {
            dispatch(set_login_page(login_page + 1))

        }
        else {
            toast.error('All are required field')
        }
    }
    else if (login_page == 2) {
        if (
            input_data[4].First_name.trim() !== '' &&
            input_data[5].Last_name.trim() !== '' &&
            input_data[6].Phone !== '' &&
            input_data[6].Phone !== undefined
        ) {

            dispatch(set_login_page(login_page + 1))

        }
        else {
            toast.error('All are required field')
        }
    }

    else if (login_page == 3) {

        if (isValidEmail(input_data[7].Email.trim())) {


            if (isStrongPassword(input_data[8].Password.trim())) {


                if (input_data[10].Agree)

                    try {

                        dispatch(set_React_loader(true))

                        const res = await addData(input_data)

                        dispatch(set_React_loader(false))

                        if (res.data) {

                            const token = 'Bearer ' + res.data.token

                            localStorage.setItem('token', token)  //shaving token in localstorage          

                            dispatch(setIsAuthenticated(true))//saving in redux store for instant calling

                            dispatch(set_User_id(res.data.User_id))

                            toast.success('Thanks for joining us.')

                            navigate('/form')//navigate to form section

                        }

                        else if (res.error) { toast.error(res.error.data.val) }


                        else {

                            toast.error('Something Went Wrong Try Again')
                        }

                    } catch (error) {

                        dispatch(set_React_loader(false))

                        toast.error('Something Went Wrong Try Again')

                    }
                else {
                    toast.error('Agree terms & Condition')
                }

            }
            else {
                toast.error('Set a strong password')

            }


        }
        else {
            toast.error('Incorrect Email')

        }
    }



}


export { send_sign_data }