import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const handleLogin = (event) => {
        event.preventDefault()
        dispatch(loginUser(username, password))
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    id="username"
                    type="text"
                    value={username}
                    name="username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    id="password"
                    type="text"
                    value={password}
                    name="password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id="login-button" type="submit">
                login
            </button>
        </form>
    )
}

export default LoginForm
