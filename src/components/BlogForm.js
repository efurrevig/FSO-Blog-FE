import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: title,
            author: author,
            url: url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }


    return (
        <form onSubmit={addBlog}>
            <div>
                Title:
                <input
                    data-testid='title'
                    type='text'
                    value={title}
                    name='title'
                    onChange={ ({ target }) => setTitle(target.value) }
                />
            </div>
            <div>
                Author:
                <input
                    data-testid='author'
                    type='text'
                    value={author}
                    name='author'
                    onChange={ ({ target }) => setAuthor(target.value) }
                />
            </div>
            <div>
                URL:
                <input
                    data-testid='url'
                    type='text'
                    value={url}
                    name='url'
                    onChange={ ({ target }) => setUrl(target.value) }
                />
            </div>
            <button type='submit'>Add Blog</button>
        </form>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm