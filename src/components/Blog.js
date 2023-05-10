import { useState } from 'react'
import BlogLikeButton from './BlogLikeButton'
import RemoveBlogButton from './RemoveBlogButton'

const Blog = ({ blog, blogs, setBlogs }) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 1,
        maxWidth: 500
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title}
                <button onClick={toggleVisibility} className='toggleButton'>{visible ? 'hide' : 'show'}</button>
            </div>
            <div style={showWhenVisible} className='toggledBlogContent'>
                <p>Author: {blog.author}</p>
                <p>URL: {blog.url}</p>
                <p>Likes: {blog.likes}</p>
                <p>Added by: {blog.user.name}</p>
                <BlogLikeButton blog={blog} blogs={blogs} setBlogs={setBlogs} />
                <div>
                    <RemoveBlogButton blog={blog} blogs={blogs} setBlogs={setBlogs} />
                </div>
            </div>
        </div>
    )
}

export default Blog