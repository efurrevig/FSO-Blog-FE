import { Link } from 'react-router-dom'
import {
    AppBar,
    MenuItem,
    Container,
    Toolbar,
    Box
} from '@mui/material'

const NavBar = () => {
    const links = [
        <Link key='home' to='/'>Home</Link>,
        <Link key='users' to='/users'>Users</Link>,
        <Link key='profile' to='/profile'>Profile</Link>
    ]
    return (
        <div>
            <AppBar position='static'>
                <Toolbar disableGutters>
                    <Container maxWidth='x1'>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            {links.map(link => (
                                <MenuItem
                                    key={link.key}
                                    component={Link}
                                    to={link.props.to}
                                >
                                    {link.props.children}
                                </MenuItem>
                            ))}
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar