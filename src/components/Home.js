import { useRef } from 'react'
import Blogs from './BlogList'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Home = ({ user }) => {
    const toggleBlogForm = () => {
        blogFormRef.current.toggleVisibility()
    }
    const blogFormRef = useRef()

    return (
        <div>
            {user !== null && (
                <Togglable buttonLabel="create new" ref={blogFormRef}>
                    <BlogForm toggleForm={toggleBlogForm} />
                </Togglable>
            )}
            <Blogs />
        </div>
    )
}


export default Home