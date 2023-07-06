import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface NotifiesState {
    notifies: Notify[]
}

interface Notify {
    id: number,
    type: 'error' | 'success' | 'warning' | 'info',
    message: string,
    time: number,
    open?: boolean,
    vertical?: 'top' | 'bottom',
    horizontal?: 'center' | 'left' | 'right',
}

const initialState: NotifiesState = {
    notifies: []
}

export const notifiesSlice = createSlice({
    name: 'notifies',
    initialState,
    reducers: {
        createNotifies(state, action) {
            let notify = {
                id: Date.now(),
                type: action.payload.type,
                message: action.payload.message,
                time: action.payload.time,
                open: true,
                vertical: 'bottom',
                horizontal: 'right'
            }
            state.notifies.push(notify as Notify)
        },
        deleteNotify(state, action: PayloadAction<number>) {
            let index = state.notifies.findIndex((n: Notify) => n.id === action.payload)
            state.notifies.splice(index, 1)
        }
    }
})


export default notifiesSlice.reducer

export const {createNotifies, deleteNotify} = notifiesSlice.actions
