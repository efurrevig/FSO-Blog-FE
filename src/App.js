import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
//import Blog from './components/Blog'
import Blogs from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const createBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        try {
            const newBlog = await blogService.create(blogObject)
            newBlog.user = { username: user.username, name: user.name }
            setBlogs(blogs.concat(newBlog))
            handleSuccess(`${newBlog.title} successfully added`)
        } catch (error) {
            handleFailure(error.response.data.error)
            console.log(error)
            console.log(blogObject)
        }
    }

    // const replaceBlogById = (id, arr) => {
    //     const updatedBlogs = arr.map((b) => {
    //         if (b.id === id) {
    //             return {
    //                 ...b,
    //                 likes: b.likes + 1,
    //             }
    //         } else {
    //             return b
    //         }
    //     })
    //     return updatedBlogs
    // }

    // const likeBlog = async (blogObject) => {
    //     const newBlog = {
    //         title: blogObject.title,
    //         author: blogObject.author,
    //         url: blogObject.url,
    //         likes: blogObject.likes + 1,
    //         user: blogObject.user.id,
    //     }

    //     try {
    //         await blogService.edit(newBlog, blogObject.id)
    //         const newBlogList = replaceBlogById(blogObject.id, blogs)
    //         setBlogs(
    //             newBlogList.sort((blog1, blog2) => blog2.likes - blog1.likes)
    //         )
    //     } catch (error) {
    //         handleFailure(error.response.data.error)
    //     }
    // }

    // const deleteBlog = async (blogObject) => {
    //     if (
    //         !window.confirm(
    //             `Are you sure you want to delete ${blogObject.title}?`
    //         )
    //     ) {
    //         return
    //     }
    //     try {
    //         await blogService.destroy(blogObject.id)
    //         setBlogs(blogs.filter((b) => b.id !== blogObject.id))
    //         handleSuccess(`${blogObject.title} successfully removed`)
    //     } catch (error) {
    //         handleFailure(error.response.data.error)
    //         console.log(error)
    //     }
    // }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            )
            setUser(user)
            setUsername('')
            setPassword('')
            setSuccessMessage('Successfully logged in')
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)
        } catch (error) {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        setUser(null)
        blogService.setToken(null)
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    const handleSuccess = (message) => {
        setSuccessMessage(message)
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)
    }

    const handleFailure = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const blogFormRef = useRef()

    return (
        <div>
            <h1>Blogs</h1>

            <Notification message={errorMessage} messageType="error" />
            <Notification message={successMessage} messageType="success" />

            {user !== null && (
                <div>
                    logged in as: {user.username}
                    <button onClick={handleLogout}>logout</button>
                </div>
            )}
            {user === null && (
                <Togglable buttonLabel="login">
                    <LoginForm
                        handleLogin={handleLogin}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                    />
                </Togglable>
            )}
            {/* <div id="blog-container">
                {blogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLikeSubmit={likeBlog}
                        handleDeleteBlog={deleteBlog}
                    />
                ))}
            </div> */}
            <Blogs />
            {user !== null && (
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <BlogForm createBlog={createBlog} />
                </Togglable>
            )}
        </div>
    )
}

export default App
