import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

/*reducers*/
import notifiesReducer from './NotifiesSlice'
import authReducer from './AuthSlice'
import filterReducer from './FilterSlice'

/*services*/
import {authAPI} from "../Services/AuthService";
import {roomsAPI} from "../Services/RoomsService";
import {bookingAPI} from "../Services/BookingService";
import {hotelsAPI} from "../Services/HotelsService";

const persistConfig = {
    key: 'Ovva',
    storage,
    whitelist: ["auth", "filter"]
}

const rootReducer = combineReducers({
    notifies: notifiesReducer,
    auth: authReducer,
    filter: filterReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [roomsAPI.reducerPath]: roomsAPI.reducer,
    [bookingAPI.reducerPath]: bookingAPI.reducer,
    [hotelsAPI.reducerPath]: hotelsAPI.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat(
            authAPI.middleware,
            roomsAPI.middleware,
            bookingAPI.middleware,
            hotelsAPI.middleware,
        )
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
