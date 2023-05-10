const BlogLikeButton = ({ buttonText, handleSubmit }) => {
    return (
        <button onClick={handleSubmit}>{buttonText}</button>
    )
}

export default BlogLikeButton