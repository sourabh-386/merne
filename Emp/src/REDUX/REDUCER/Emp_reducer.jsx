import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    page: 1,

    background_blur: false,

    Genral_info: [],

    Personal_detail: {
        First_Name: '',
        Middle_Name: '',
        Last_Name: '',
        DOB: '',
        Gender: '',
        Email: '',
        Phone: '',
        Address1: '',
        Address2: '',
        State: '',
        City: "",
        Pin_Code: ''
    },

    user_image: '',

    resume: {
        name: '',
        url: ''
    },

    job_form_data: [],
    edit_job_form_data: '',

    project_form_data: [],
    edit_project_form_data: '',

    tranning_form_data: [],
    edit_tranning_form_data: '',

    education_form_data: [],
    edit_education_form_data: '',

    Skills: [],

    Links: [
        {
            Github_Profile: ''
        },
        {
            Linkdin_Profile: ''
        },
        {
            Portfolio_link: ''
        },
        {
            Other_work: []
        }
    ],


}

export const EmpPageSlice = createSlice({
    name: 'EmpPage',
    initialState,
    reducers: {
        set_page_val: (state, action) => {
            state.page = action.payload
        },
        set_background_blur: (state, action) => {
            state.background_blur = action.payload
        },

        // -------------------------------------------------------------------------------------------------------------

        set_job_form_data: (state, action) => {
            state.job_form_data = [...state.job_form_data, action.payload]
        },
        set_job_form_data_delete: (state, action) => {
            state.job_form_data = state.job_form_data.filter(value => { return (value.key !== action.payload) })
        },
        set_job_form_edit_data: (state, action) => {
            state.edit_job_form_data = action.payload
        },
        update_job_form_data: (state, action) => {
            const findIndex = state.job_form_data.findIndex(val => { return (val.key == action.payload.key) })
            state.job_form_data.splice(findIndex, 1, action.payload)
        },

        // -------------------------------------------------------------------------------------------------------------

        set_project_form_data: (state, action) => {
            state.project_form_data = [...state.project_form_data, action.payload]
        },
        set_project_form_data_delete: (state, action) => {
            state.project_form_data = state.project_form_data.filter(value => { return (value.id !== action.payload) })
        },
        set_project_form_edit_data: (state, action) => {
            state.edit_project_form_data = action.payload
        },
        update_project_form_data: (state, action) => {
            const findIndex = state.project_form_data.findIndex(val => { return (val.id == action.payload.id) })
            state.project_form_data.splice(findIndex, 1, action.payload)
        },

        // -----------------------------------------------------------------------------------------------------------
        set_tranning_form_data: (state, action) => {
            state.tranning_form_data = [...state.tranning_form_data, action.payload]
        },
        set_tranning_form_data_delete: (state, action) => {
            state.tranning_form_data = state.tranning_form_data.filter(value => { return (value.id !== action.payload) })
        },
        set_tranning_form_edit_data: (state, action) => {
            state.edit_tranning_form_data = action.payload
        },
        update_tranning_form_data: (state, action) => {
            const findIndex = state.tranning_form_data.findIndex(val => { return (val.id == action.payload.id) })
            state.tranning_form_data.splice(findIndex, 1, action.payload)
        },

        // -------------------------------------------------------------------------------------------------------------


        set_education_form_data: (state, action) => {
            state.education_form_data = Array.isArray(state.education_form_data)
                ? [...state.education_form_data, action.payload]
                : [action.payload];
        },
        set_education_form_data_delete: (state, action) => {
            state.education_form_data = state.education_form_data.filter(value => { return (value.id !== action.payload) })
        },
        set_education_form_edit_data: (state, action) => {
            state.edit_education_form_data = action.payload
        },
        update_education_form_data: (state, action) => {
            const findIndex = state.education_form_data.findIndex(val => { return (val.id == action.payload.id) })
            state.education_form_data.splice(findIndex, 1, action.payload)
        },

        // -------------------------------------------------------------------------------------------------------------


        add_skills: (state, action) => {
            state.Skills = action.payload

        },
        delete_skills: (state, action) => {
            state.Skills = state.Skills.filter(value => { return (value !== action.payload) })

        },

        // -----------------------------------------------------------------------------------------        

        set_links: (state, action) => {

            console.log('action', action.payload)

            action.payload.forEach(val => {

                const key = Object.keys(val)[0];

                if (key === "Github_Profile") {
                    state.Links[0].Github_Profile = val[key];
                } else if (key === "Linkdin_Profile") {
                    state.Links[1].Linkdin_Profile = val[key];
                } else if (key === "Portfolio_link") {
                    state.Links[2].Portfolio_link = val[key];
                } else if (key === "Other_work") {
                    state.Links[3].Other_work = val[key];
                }
            })

        },
        set_Github_Profile: (state, action) => {
            state.Links[0].Github_Profile = action.payload
        },
        set_Linkdin_Profile: (state, action) => {
            state.Links[1].Linkdin_Profile = action.payload
        },
        set_Portfolio_link: (state, action) => {
            state.Links[2].Portfolio_link = action.payload
        },
        set_Other_work: (state, action) => {
            state.Links[3].Other_work = [...state.Links[3].Other_work, action.payload]
        },
        delete_other_work: (state, action) => {
            state.Links[3].Other_work = state.Links[3].Other_work.filter(value => { return (value !== action.payload) })
        },

        // ---------------------------------------------------------------------------------------

        set_personal_detail: (state, action) => {
            state.Personal_detail = action.payload
        },

        set_user_image: (state, action) => {
            state.user_image = action.payload
        },
        set_genral_info: (state, action) => {
            state.Genral_info = action.payload
        },

        // ---------------------------------------------------------------------------------

        set_Resume_name: (state, action) => {
            state.resume.name = action.payload
        },

        set_Resume_url: (state, action) => {
            state.resume.url = action.payload
        },


    }
})

export const {

    set_page_val,
    set_education_option_page,
    set_background_blur,
    set_education_option_page2,

    set_job_form_data,
    set_job_form_data_delete,
    set_job_form_edit_data,
    update_job_form_data,

    set_project_form_data,
    set_project_form_data_delete,
    set_project_form_edit_data,
    update_project_form_data,

    set_tranning_form_data,
    set_tranning_form_data_delete,
    set_tranning_form_edit_data,
    update_tranning_form_data,

    set_education_form_data,
    set_education_form_data_delete,
    set_education_form_edit_data,
    update_education_form_data,


    add_skills,
    delete_skills,

    set_links,

    set_Github_Profile,
    set_Linkdin_Profile,
    set_Portfolio_link,

    set_Other_work,
    delete_other_work,

    set_personal_detail,


    set_user_image,
    set_Resume_name,
    set_Resume_url,

    set_genral_info

} = EmpPageSlice.actions

export default EmpPageSlice.reducer