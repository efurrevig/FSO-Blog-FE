const BlogLikeButton = ({ buttonText, handleSubmit }) => {
    return (
        <button data-testid={buttonText} id={`${buttonText}-button`} onClick={handleSubmit}>{buttonText}</button>
    )
}

export default BlogLikeButton