import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        setNotificationS(state,action) {
            return action.payload
        },
        clearNotification(state,action) {
            return null
        }
    }
})


export const setNotification = (notifStr,time) => {
    return async dispatch => {
        dispatch(setNotificationS(notifStr))

        await new Promise(resolve => setTimeout(resolve, time *1000));

       dispatch(clearNotification())
    }
  }
export  const { setNotificationS,clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;