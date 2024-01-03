import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const dataApi = createApi({
    reducerPath: 'dataApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3009/athenticatedUsers' }),


    endpoints: (builder) => ({


        getDataId: builder.query({ query: (id) => `products/${id}` }),

        sendEmpboxData: builder.mutation({
            query: (value) => ({
                url: `usergenralInfo`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'POST',
                body: {
                    ...value
                }
            })
        }),
        // -----------------------------------------------------------------------
        empDetails: builder.mutation({
            query: (value) => ({
                url: `userdetail`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'POST',
                body: value
            })
        }),
        // -------------------------------------------------------------------------
        sendData: builder.mutation({
            query: (value) => ({
                url: `personaldetail`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'POST',
                body: value
            })
        }),
        //    -----------------------------------------------------------------------------     
        sendJobData: builder.mutation({
            query: (value) => ({
                url: `jobdetail`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'POST',
                body: value
            })
        }),
        deleteJobData: builder.mutation({
            query: (value) => ({
                url: `deletejobdetail/${value}`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'DELETE'
            })
        }),

        // ---------------------------------------------------------------------------
        sendProjectData: builder.mutation({
            query: (value) => ({
                url: `projectdetail`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'POST',
                body: value
            })
        }),
        deleteProjectData: builder.mutation({
            query: (value) => ({
                url: `deleteprojectdetail/${value}`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'DELETE'
            })
        }),

        // ---------------------------------------------------------------------------
        sendEducationData: builder.mutation({
            query: (value) => ({
                url: `educationdetail`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'POST',
                body: value
            })
        }),
        deleteEducationData: builder.mutation({
            query: (value) => ({
                url: `deleteeducationdetail/${value}`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'DELETE'
            })
        }),
        // ---------------------------------------------------------------------------
        sendTranningData: builder.mutation({
            query: (value) => ({
                url: `Tranningdetail`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'POST',
                body: value
            })
        }),
        deleteTranningData: builder.mutation({
            query: (value) => ({
                url: `deleteTranningdetail/${value}`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'DELETE'
            })
        }),
        // ---------------------------------------------------------------------------
        sendSkillData: builder.mutation({
            query: (value) => ({
                url: `skilldetail`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'POST',
                body: value
            })
        }),
        // ---------------------------------------------------------------------------
        sendPortfolioData: builder.mutation({
            query: (value) => ({
                url: `Portfoliodetail`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'POST',
                body: value
            })
        }),
        // ---------------------------------------------------------------------------
        uploadResume: builder.mutation({
            query: (value) => ({
                url: `uploadResume`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'POST',
                body: value
            })
        }),
        // ---------------------------------------------------------------------------
        uploadUserimg: builder.mutation({
            query: (value) => ({
                url: `uploadUserimg`,
                headers: { authorization: localStorage.getItem('token') },
                method: 'POST',
                body: value
            })
        }),
    })
})


export const {
    useSendEmpboxDataMutation,
    useEmpDetailsMutation,
    useEmpFileMutation,
    useSendDataMutation,
    useSendJobDataMutation, useDeleteJobDataMutation,
    useSendProjectDataMutation, useDeleteProjectDataMutation,
    useDeleteEducationDataMutation, useSendEducationDataMutation,
    useSendTranningDataMutation, useDeleteTranningDataMutation,
    useSendSkillDataMutation,
    useSendPortfolioDataMutation,
    useUploadResumeMutation,
    useUploadUserimgMutation

} = dataApi;