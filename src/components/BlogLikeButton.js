import blogService from '../services/blogs'

const BlogLikeButton = ({ blog, blogs, setBlogs }) => {

    const replaceBlogById = (id, arr) => {
        const updatedBlogs = arr.map((b) => {
            if (b.id === id) {
                return {
                    ...blog,
                    likes: b.likes + 1
                }
            } else {
                return b
            }
        })
        return updatedBlogs
    }

    const handleSubmit = async () => {
        const newBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id
        }

        try {
            await blogService.edit(newBlog, blog.id)
            const newBlogList = replaceBlogById(blog.id, blogs)
            setBlogs(newBlogList.sort((blog1, blog2) => blog2.likes - blog1.likes))
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <button onClick={handleSubmit}>like</button>
    )
}

export default BlogLikeButton