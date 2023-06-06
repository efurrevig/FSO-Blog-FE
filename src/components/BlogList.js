import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
    const blogs = useSelector(({ blogs }) => {
        return blogs
    })

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 1,
        maxWidth: 500,
    }

    return (
        <div id="blog-container">
            {blogs.map((blog) => (
                <div key={blog.id} style={blogStyle}>
                    <Link to={`./blogs/${blog.id}`}>{blog.title}</Link>
                </div>
            ))}
        </div>
    )
}

export default Blogs