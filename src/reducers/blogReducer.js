import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        changeBlog(state, action) { // takes blog object
            const id = action.payload.id
            const changedBlog = action.payload
            return state.map(b => b.id !== id ? b : changedBlog)
        },
        removeBlog(state, action) { // takes blog id
            const id = action.payload
            return state.filter(b => b.id !== id)
        },
        appendBlog(state, action) {
            state.push(action.payload)
        }
    }
})

export const { setBlogs, changeBlog, removeBlog, appendBlog } = blogSlice.actions

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

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.destroy(id)
        dispatch(removeBlog(id))
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        await blogService.create(blog)
        dispatch(appendBlog(blog))
    }
}

export default blogSlice.reducer