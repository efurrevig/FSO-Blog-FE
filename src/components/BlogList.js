import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    TableContainer,
    Table,
    Paper,
    TableBody,
    TableCell,
    TableRow
} from '@mui/material'

const Blogs = () => {
    const blogs = useSelector(({ blogs }) => {
        return blogs
    })


    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {blogs.map(blog => (
                            <TableRow key={blog.id}>
                                <TableCell>
                                    <Link to={`./blogs/${blog.id}`}>{blog.title}</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Blogs