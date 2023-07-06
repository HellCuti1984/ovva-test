import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {RootState} from "../Store/store";
import {IBooking} from "../Models/IBooking";

export const bookingAPI = createApi({
    reducerPath: 'bookingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Bookings', 'Booking'],
    endpoints: (build) => ({
        getBooking: build.query({
            query: (data) => ({
                url: `/api/booking/get`,
                method: 'GET',
                body: data
            }),
            providesTags: () => ["Bookings"],
        }),
        getBookingById: build.query({
            query: (data) => ({
                url: `/api/booking/getById`,
                method: 'GET',
                body: data
            }),
            providesTags: () => ["Booking"],
        }),
        storeBooking: build.mutation({
            query: (data: IBooking) => ({
                url: `/api/booking/store`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Bookings'],
            transformResponse: (data: {code: number, data: IBooking}) => {
                return data.data
            }
        }),
        updateBooking: build.mutation({
            query: (data) => ({
                url: `/api/booking/update`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Bookings'],
        }),
        deleteBooking: build.mutation({
            query: (data) => ({
                url: `/api/booking/delete`,
                method: 'DELETE',
                params: data
            }),
            invalidatesTags: ['Bookings'],
        }),
    })
})

export const {
    useGetBookingQuery,
    useGetBookingByIdQuery,
    useStoreBookingMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation
} = bookingAPI
