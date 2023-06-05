import { useEffect, useRef } from 'react'
import Blogs from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'

const App = () => {
    // const [errorMessage, setErrorMessage] = useState(null)
    // const [successMessage, setSuccessMessage] = useState(null)

    const dispatch = useDispatch()
    const user = useSelector(({ user }) => {
        return user
    })
    const notification = useSelector(({ notification }) => {
        return notification
    })
    console.log('notification', notification)
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUser())
    }, [dispatch])

    const toggleBlogForm = () => {
        blogFormRef.current.toggleVisibility()

    }

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    // const handleSuccess = (message) => {
    //     setSuccessMessage(message)
    //     setTimeout(() => {
    //         setSuccessMessage(null)
    //     }, 5000)
    // }

    // const handleFailure = (message) => {
    //     setErrorMessage(message)
    //     setTimeout(() => {
    //         setErrorMessage(null)
    //     }, 5000)
    // }

    const blogFormRef = useRef()

    return (
        <div>
            <h1>Blogs</h1>

            <Notification message={notification.message} messageType={notification.type} />

            {user !== null && (
                <div>
                    logged in as: {user.username}
                    <button onClick={handleLogout}>logout</button>
                </div>
            )}
            {user === null && (
                <Togglable buttonLabel="login">
                    <LoginForm />
                </Togglable>
            )}

            <Blogs />
            {user !== null && (
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <BlogForm toggleForm={toggleBlogForm} />
                </Togglable>
            )}
        </div>
    )
}

export default App
