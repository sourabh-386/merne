import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3009/' }),


    endpoints: (builder) => ({


        getDataId: builder.query({ query: (id) => `products/${id}` }),

        parentApi: builder.query({
            query: () => ({

                url: "userProfile",
                headers: { authorization: localStorage.getItem('token') }

            })
        }),


        addData: builder.mutation({
            query: (Send_data) => ({
                url: `user/Signin`,
                method: 'POST',
                body: [
                    ...Send_data
                ]
            })
        }),
        addDataLogin: builder.mutation({
            query: (Send_data) => ({
                url: `user/Login`,
                method: 'POST',
                body: {
                    Email : Send_data[0],
                    Password : Send_data[1]
                }
            })
        }),
        googleLogin: builder.mutation({
            query: (credentialResponse) => ({
                url: "/auth/google",
                method: "POST",
                body: {
                    credential: credentialResponse,
                },
            }),
        }),
        forgotPassword: builder.mutation({
            query: (Send_data) => ({
                url: `user/forgotPassword`,
                method: 'POST',
                body: {
                    Email: Send_data
                }
            })
        }),
        restPassword: builder.mutation({
            query: ({ value, path }) => ({
                url: `user${path}`,
                method: 'POST',
                body: {
                    ...value
                }
            })
        }),
    }),


});

export const {
    useGetDataQuery,
    useGetDataIdQuery,
    useAddDataMutation,
    useAddDataLoginMutation,
    useForgotPasswordMutation,
    useRestPasswordMutation,
    useParentApiQuery,

    useGoogleLoginMutation
} = api;