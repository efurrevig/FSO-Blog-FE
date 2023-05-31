import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        changeBlog(state, action) {
            const id = action.payload.id
            const changedBlog = action.payload
            return state.map(b => b.id !== id ? b : changedBlog)
        }
    }
})

export const { setBlogs, changeBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log(blogs)
        dispatch(setBlogs(blogs))
    }
}

export const likeBlog = (blog) => {
    const changedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id
    }

    return async dispatch => {
        const updatedBlog = await blogService.edit(changedBlog, blog.id)
        dispatch(changeBlog(updatedBlog))
    }
}

export default blogSlice.reducer