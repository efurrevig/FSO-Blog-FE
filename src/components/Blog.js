import { useState } from 'react'
import BlogButton from './BlogButton'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }
    const dispatch = useDispatch()

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleLikeSubmit = (blog) => {
        console.log('liked')
        dispatch(likeBlog(blog))
    }

    const handleDeleteBlog = () => {
        console.log('deleted')
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 1,
        maxWidth: 500,
    }

    return (
        <div className="blog" style={blogStyle}>
            <div>
                {blog.title}
                <button onClick={toggleVisibility} className="toggleButton">
                    {visible ? 'hide' : 'show'}
                </button>
            </div>
            <div style={showWhenVisible} className="toggledBlogContent">
                <p>Author: {blog.author}</p>
                <p>URL: {blog.url}</p>
                <p>
                    Likes: <span id="like-count">{blog.likes}</span>
                </p>
                <p>Added by: {blog.user.name}</p>
                <BlogButton
                    buttonText="Like"
                    handleSubmit={() => handleLikeSubmit(blog)}
                />
                <div>
                    <BlogButton
                        buttonText="Remove"
                        handleSubmit={() => handleDeleteBlog(blog)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Blog
