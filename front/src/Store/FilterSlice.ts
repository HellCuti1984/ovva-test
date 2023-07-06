import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface FilterInterface {
    filter: {
        priceMin?: number,
        priceMax?: number,
        capacityMin?: number,
        capacityMax?: number
    },
}

const initialState: FilterInterface = {
    filter: {
        priceMin: 0,
        priceMax: 0,
        capacityMin: 0,
        capacityMax: 0
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<any>) {
            state.filter.priceMin = action.payload.priceMin;
            state.filter.priceMax = action.payload.priceMax
            state.filter.capacityMin = action.payload.capacityMin
            state.filter.capacityMax = action.payload.capacityMax
        },
        clearFilter(state, action: PayloadAction<null>) {
            state.filter = {
                priceMin: 0,
                priceMax: 0,
                capacityMin: 0,
                capacityMax: 0
            }
        },
    }
})


export default filterSlice.reducer

export const {setFilter, clearFilter} = filterSlice.actions
