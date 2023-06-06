import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Users = () => {
    const users = useSelector(({ users }) => {
        return users
    })

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td><Link to={`./${u.id}`}>{u.name}</Link></td>
                            <td>{u.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Users