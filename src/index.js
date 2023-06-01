import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'


import './index.css'

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        user: userReducer
    }
})

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
