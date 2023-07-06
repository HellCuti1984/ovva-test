import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {RootState} from "../Store/store";
import {IRoom} from "../Models/IRoom";

export const roomsAPI = createApi({
    reducerPath: 'roomsApi',
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
    tagTypes: ['Rooms', 'Room', 'RoomByHotel'],
    endpoints: (build) => ({
        getRooms: build.query({
            query: (data) => ({
                url: `/api/rooms/get`,
                method: 'GET',
                body: data
            }),
            providesTags: result => ['Rooms']
        }),
        getRoomsById: build.query({
            query: (data) => ({
                url: `/api/rooms/getById`,
                method: 'GET',
                body: data
            }),
            providesTags: result => ['Room']
        }),
        getRoomsByHotelId: build.query({
            query: (data: {
                hotel_id: number,
                priceMin?: number,
                priceMax?: number,
                capacityMin?: number,
                capacityMax?: number,
            }) => ({
                url: `/api/rooms/getByHotelId`,
                method: 'GET',
                params: {
                    hotel_id: data.hotel_id,
                    priceMin: data.priceMin,
                    priceMax: data.priceMax,
                    capacityMin: data.capacityMin,
                    capacityMax: data.capacityMax,
                }
            }),
            transformResponse: (data: { code: number, data: IRoom[] }) => {
                return data.data
            },
            providesTags: result => ['RoomByHotel']
        }),
        storeRoom: build.mutation({
            query: (data) => ({
                url: `/api/rooms/store`,
                method: 'POST',
                body: data
            }),
            transformResponse: (data: { code: number, data: IRoom }) => {
                return data.data
            },
            invalidatesTags: ['Rooms']
        }),
        updateRoom: build.mutation({
            query: (data) => ({
                url: `/api/rooms/update`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Rooms']
        }),
        deleteRoom: build.mutation({
            query: (id) => ({
                url: `/api/rooms/delete`,
                method: 'DELETE',
                params: {
                    id: id
                }
            }),
            invalidatesTags: ['Rooms']
        }),
    })
})

export const {
    useGetRoomsQuery,
    useLazyGetRoomsQuery,
    useGetRoomsByIdQuery,
    useGetRoomsByHotelIdQuery,
    useStoreRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation
} = roomsAPI
