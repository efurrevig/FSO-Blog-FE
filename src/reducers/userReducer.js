import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { createNotification } from './notificationReducer'


const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action){
            return action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        return dispatch => {
            blogService.setToken(user.token)
            dispatch(setUser(user))
        }
    } else {
        return dispatch => {
            dispatch(setUser(null))
        }
    }
}

export const logoutUser = () => {
    return dispatch => {
        dispatch(setUser(null))
        blogService.setToken(null)
        window.localStorage.removeItem('loggedBlogAppUser')
    }
}

export const loginUser = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({ username, password })
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            )
            dispatch(setUser(user))
            dispatch(createNotification('success', 'Successfully logged in'))
        } catch (error) {
            dispatch(setUser(null))
            dispatch(createNotification('error', error.response.data.error))
            console.log(error)
        }
    }
}

export default userSlice.reducer