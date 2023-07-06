import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {RootState} from "../Store/store";
import {HotelInterface, HotelResponseInterface} from "../Models";
import {HotelsResponseInterface} from "../Models/IHotels";

export const hotelsAPI = createApi({
    reducerPath: 'hotelsApi',
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
        baseUrl: process.env.REACT_APP_API_URL
    }),
    tagTypes: ['Hotels', 'Hotel'],
    endpoints: (build) => ({
        getHotels: build.query({
            query: () => ({
                url: `/api/hotels/get`,
                method: 'GET',
            }),
            providesTags: ['Hotels'],
            transformResponse: (data: HotelsResponseInterface) => {
                return data.data
            }
        }),
        getHotelsById: build.query({
            query: (data) => ({
                url: `/api/hotels/getById`,
                method: 'GET',
                body: data
            }),
            providesTags: ['Hotel'],
            transformResponse: (data: HotelResponseInterface) => {
                return data.data
            },
        }),
        storeHotel: build.mutation({
            query: (data: HotelInterface) => ({
                url: `/api/hotels/store`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Hotels'],
            transformResponse: (data: HotelResponseInterface) => {
                return data.data
            }
        }),
        updateHotel: build.mutation({
            query: (data) => ({
                url: `/api/hotels/update`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Hotels'],
            transformResponse: (data: HotelResponseInterface) => {
                return data.data
            }
        }),
        deleteHotel: build.mutation({
            query: (data) => ({
                url: `/api/hotels/delete`,
                method: 'DELETE',
                params: data
            }),
            invalidatesTags: ['Hotels'],
            transformResponse: (data: HotelResponseInterface) => {
                return data.data
            }
        }),
    })
})

export const {
    useGetHotelsQuery,
    useGetHotelsByIdQuery,
    useStoreHotelMutation,
    useUpdateHotelMutation,
    useDeleteHotelMutation
} = hotelsAPI
