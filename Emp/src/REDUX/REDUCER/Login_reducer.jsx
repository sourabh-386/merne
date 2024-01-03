import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {

    loginpage: 1,
    User_id: '',
    create_account_details: [
        { Work: '' },
        { Current_CTC: '' },
        { Expected_CTC: '' },
        { Desired_Job: '' },
        { First_name: '' },
        { Last_name: '' },
        { Phone: '' },
        { Email: '' },
        { Password: '' },
        { confirm_Password: '' },
        { Agree: '' }
    ]
}

export const LoginPageSlice = createSlice({

    name: 'LoginPage',
    initialState,

    reducers: {

        set_login_page: (state, action) => { state.loginpage = action.payload },

        set_User_id: (state, action) => { state.User_id = action.payload },

        set_login: (state, action) => { state.login = action.payload },

        set_create_account_details: (state, action) => {

            switch (action.payload.name) {

                case 'Work': state.create_account_details[0].Work = action.payload.value
                    break;
                case 'Current_CTC': state.create_account_details[1].Current_CTC = action.payload.value
                    break;
                case 'Expected_CTC': state.create_account_details[2].Expected_CTC = action.payload.value
                    break;
                case 'Desired_Job': state.create_account_details[3].Desired_Job = action.payload.value
                    break;
                case 'First_name': state.create_account_details[4].First_name = action.payload.value
                    break;
                case 'Last_name': state.create_account_details[5].Last_name = action.payload.value
                    break;
                case 'Phone': state.create_account_details[6].Phone = action.payload.value
                    break;
                case 'Email': state.create_account_details[7].Email = action.payload.value
                    break;
                case 'Password': state.create_account_details[8].Password = action.payload.value
                    break;
                case 'confirm_Password': state.create_account_details[9].confirm_Password = action.payload.value
                    break;
                case 'Agree': state.create_account_details[10].Agree = action.payload.value
                    break;
                default:
                // code block
            }
        },
    }
})

export const { set_login_page, set_login, set_create_account_details, set_User_id } = LoginPageSlice.actions

export default LoginPageSlice.reducer