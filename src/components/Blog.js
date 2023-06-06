import BlogButton from './BlogButton'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import CommentForm from './CommentForm'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLikeSubmit = (blog) => {
        console.log('liked')
        dispatch(likeBlog(blog))
    }

    const handleDeleteBlog = (blog) => {
        console.log('deleted')
        if (!window.confirm(
            `Are you sure you want to delete ${blog.title}?`
        )) {
            return
        }
        dispatch(deleteBlog(blog.id))
        navigate('/')
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 1,
        maxWidth: 500,
    }

    if (!blog) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div className="blog" style={blogStyle}>
            <div>
                {blog.title}


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

                <h3>Comments</h3>
                <CommentForm blog={blog} />

                <ul>
                    {blog.comments.map((c) => (
                        <li key={c.id}>{c.content}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Blog
