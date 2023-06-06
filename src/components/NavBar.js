import { Link } from 'react-router-dom'
const NavBar = () => {
    const padding = {
        padding: 5
    }
    const margin = {
        margin: 10
    }
    return (
        <div style={margin}>
            <Link style={padding} to='/'>Home</Link>
            <Link style={padding} to='/users'>Users</Link>
            <Link style={padding} to='/profile'>Profile</Link>
        </div>
    )
}

export default NavBar