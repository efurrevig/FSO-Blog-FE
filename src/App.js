import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService
        .login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('Successfully logged in')
      setTimeout(() => {
        setSuccessMessage(null)
      },5000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() =>  {
        setErrorMessage(null)
      },5000)
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

  return (
    <div>

      <h1>Blogs</h1>

      <Notification message={errorMessage} messageType='error' />
      <Notification message={successMessage} messageType='success' />

      {
        user !== null &&
        <div>
          logged in as: {user.username}
          <button onClick={handleLogout}>logout</button>
        </div>
      }
      {
        user === null && <LoginForm 
                            handleLogin={handleLogin} 
                            username={username} 
                            setUsername={setUsername} 
                            password={password} 
                            setPassword={setPassword} 
                          />
      }
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />  
        )}
      </ul>
      {
        user !== null && <BlogForm user={user} blogs={blogs} setBlogs={setBlogs} handleSuccess={handleSuccess} handleFailure={handleFailure} /> 
      }

    </div>
  );
}

export default App;
