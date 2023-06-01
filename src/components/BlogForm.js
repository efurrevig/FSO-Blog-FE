import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ toggleForm }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(({ user }) => {
        return user
    })

    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url,
            user: {
                username: user.username,
                name: user.name
            }
        }

        dispatch(createBlog(newBlog))
        toggleForm()
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                Title:
                <input
                    id="title"
                    data-testid="title"
                    type="text"
                    value={title}
                    name="title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                Author:
                <input
                    id="author"
                    data-testid="author"
                    type="text"
                    value={author}
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                URL:
                <input
                    id="url"
                    data-testid="url"
                    type="text"
                    value={url}
                    name="url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button id="add-blog-button" type="submit">
                Add Blog
            </button>
        </form>
    )
}

BlogForm.propTypes = {
    toggleForm: PropTypes.func.isRequired,
}

export default BlogForm
