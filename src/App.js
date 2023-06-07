import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import { initializeUserArray } from './reducers/usersReducer'
import { Container } from '@mui/material'
import {
    Routes,
    Route,
    useMatch
} from 'react-router-dom'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NavBar from './components/NavBar'
import Home from './components/Home'
import UserDisplay from './components/UserDisplay'
import Blog from './components/Blog'


const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(({ user }) => {
        return user
    })
    const users = useSelector(({ users }) => {
        return users
    })
    const blogs = useSelector(({ blogs }) => {
        return blogs
    })

    const notification = useSelector(({ notification }) => {
        return notification
    })

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUser())
        dispatch(initializeUserArray())
    }, [dispatch])

    // const toggleBlogForm = () => {
    //     blogFormRef.current.toggleVisibility()
    // }

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    // const blogFormRef = useRef()

    const userMatch = useMatch('/users/:id')
    const userToDisplay = userMatch
        ? users.find( u => u.id === userMatch.params.id)
        : null

    const blogMatch = useMatch('/blogs/:id')
    const blogToDisplay = blogMatch
        ? blogs.find( b => b.id === blogMatch.params.id)
        : null

    return (
        <Container>
            <div>
                <h1>Blogs</h1>

                <Notification message={notification.message} messageType={notification.type} />
                <NavBar />
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
                <Routes>
                    <Route path='/' element={<Home user={user} />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/users/:id' element={ <UserDisplay user={userToDisplay} />} />
                    <Route path='/blogs/:id' element={ <Blog blog={blogToDisplay} />} />
                </Routes>

            </div>
        </Container>
    )
}

export default App
