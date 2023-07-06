import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface Auth {
    user: {
        id: number,
        last_name: string,
        first_name: string,
        second_name: string,
        email: string,
    } | null,
    token: null
}

const initialState: Auth = {
    user: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveAuth(state, action: PayloadAction<Auth>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        deleteAuth(state, action: PayloadAction<null>) {
            state.user = null;
            state.token = null;
        }
    }
})


export default authSlice.reducer

export const {saveAuth, deleteAuth} = authSlice.actions
