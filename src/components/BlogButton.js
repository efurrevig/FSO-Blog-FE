const BlogLikeButton = ({ buttonText, handleSubmit }) => {
    return (
        <button data-testid={buttonText} onClick={handleSubmit}>{buttonText}</button>
    )
}

export default BlogLikeButton