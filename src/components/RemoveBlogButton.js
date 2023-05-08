import blogService from '../services/blogs'

const RemoveBlogButton = ({ blog, blogs, setBlogs }) => {
    const removeBlogById = (id, arr) => {
        const newBlogList = arr.filter((b) => b.id !== id)
        return newBlogList
    }
    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
            return
        }
        try {
            blogService.destroy(blog.id)
            setBlogs(removeBlogById(blog.id, blogs))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button onClick={handleDelete}>Delete Blog</button>
    )
}

export default RemoveBlogButton