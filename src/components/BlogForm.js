import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ user, blogs, setBlogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        
        const blogObject = {
            title: title,
            author: author,
            url: url
        }

        try {
            const addedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(addedBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                Title:
                <input
                    type='text'
                    value={title}
                    name='title'
                    onChange={ ({ target }) => setTitle(target.value) }
                />
            </div>
            <div>
                Author:
                <input
                    type='text'
                    value={author}
                    name='author'
                    onChange={ ({ target }) => setAuthor(target.value) }
                />
            </div>
            <div>
                URL:
                <input
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

export default BlogForm