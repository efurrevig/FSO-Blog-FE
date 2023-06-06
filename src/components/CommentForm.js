import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
const CommentForm = ( { blog } ) => {
    const [content, setContent] = useState('')
    const dispatch = useDispatch()

    const addComment = (event) => {
        event.preventDefault()
        const newComment = {
            content: content
        }

        dispatch(commentBlog(blog, newComment))
    }

    return (
        <form onSubmit={addComment}>
            <input
                id='content'
                type='text'
                value={content}
                name='content'
                onChange={({ target }) => setContent(target.value)}
            />
            <button type='submit'>add comment</button>
        </form>
    )
}

export default CommentForm