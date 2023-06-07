import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import {
    TextField,
    Button
} from '@mui/material'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const handleLogin = (event) => {
        event.preventDefault()
        dispatch(loginUser(username, password))
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                <TextField
                    label='username'
                    onChange={event => {setUsername(event.target.value)}}
                />
            </div>
            <div>
                <TextField
                    label='password'
                    type='password'
                    onChange={event => {setPassword(event.target.value)}}
                />
            </div>
            <Button varient='contained' color='primary' type='submit'>
                Login
            </Button>
        </form>
    )
}

export default LoginForm
