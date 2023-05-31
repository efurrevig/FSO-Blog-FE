import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
    const blogs = useSelector(({ blogs }) => {
        return blogs
    })

    return (
        <div id="blog-container">
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                />
            ))}
        </div>
    )
}

export default Blogs