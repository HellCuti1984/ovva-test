import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'

export const authAPI = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL
    }),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        login: build.mutation({
            query: (data) => ({
                url: `/api/login`,
                method: 'POST',
                body: data
            }),
        }),
        registration: build.mutation({
            query: (data) => ({
                url: `/api/registration`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegistrationMutation
} = authAPI
