import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
    Authenticated: false,
    Data1: false,
    Data2: false
}

export const ApiRes = createSlice({
    name: 'ApiRes',
    initialState,
    reducers: {

        setIsAuthenticated: (state, action) => {
            state.Authenticated = action.payload
        },
        setData1: (state, action) => {
            state.Data1 = action.payload
        },
        setData2: (state, action) => {
            state.Data2 = action.payload
        },
    }

})

export const {
    setIsAuthenticated,
    setData1,
    setData2

} = ApiRes.actions

export default ApiRes.reducer
