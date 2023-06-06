import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: null,
    type: null
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})

export const { setNotification } = notificationSlice.actions

export const createNotification = (type, message) => {
    return dispatch => {
        dispatch(setNotification({
            message: message,
            type: type
        }))
        setTimeout(() => {
            dispatch(setNotification(initialState))
        }, 5000)
    }
}

export default notificationSlice.reducer