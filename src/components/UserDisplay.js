// import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'

const UserDisplay = ({ user }) => {
    console.log(user, 'hello')

    if (!user) {
        return (
            <div>loading...</div>
        )
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>

            <ul>
                {user.blogs.map((b) => (
                    <li key={b.id}>{b.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserDisplay