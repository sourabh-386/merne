import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    React_loader: false
}


export const OtherSlice = createSlice({
    name: 'OtherStuff',
    initialState,
    reducers: {
        set_React_loader: (state, action) => {
            state.React_loader = action.payload
        }
    }
})


export const { set_React_loader } = OtherSlice.actions

export default OtherSlice.reducer
