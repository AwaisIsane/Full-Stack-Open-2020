import { createSlice } from '@reduxjs/toolkit'

const initialState = "initial notification componet state"

const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        setNotificaion(state,action) {
            return action.payload
        },
        clearNotification(state,action) {
            return null
        }
    }
})

export  const { setNotificaion,clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;