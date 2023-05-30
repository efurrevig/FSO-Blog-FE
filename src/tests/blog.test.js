import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

const blog = {
    title: 'testing...',
    author: 'test author',
    url: 'test.com',
    likes: 1,
    user: { username: 'root', name: 'John Smith' },
}

describe('<Blog /> before show button is clicked', () => {
    let container

    beforeEach(() => {
        const mockHandleLike = jest.fn()
        const mockHandleDelete = jest.fn()
        container = render(
            <Blog
                blog={blog}
                handleLikeSubmit={mockHandleLike}
                handleDeleteBlog={mockHandleDelete}
            />
        ).container
    })

    test('renders only blog title initially', () => {
        const element = screen.getByText('testing...')
        expect(element).toBeDefined()
        const urlElement = screen.getByText('URL: test.com')
        expect(urlElement).toBeDefined()
    })

    test('renders all blog info when show button is clicked', async () => {
        const user = userEvent.setup()
        const button = container.querySelector('.toggleButton')
        await user.click(button)

        const likesElement = screen.getByText('Likes: 1')
        expect(likesElement).toBeDefined()
        const urlElement = screen.getByText('URL: test.com')
        expect(urlElement).toBeDefined()
    })
})

describe('<Blog /> after show button is clicked, like and delete buttons', () => {
    let container
    let handleLikeSubmit
    let handleDeleteBlog
    let user
    let button

    beforeEach(async () => {
        handleLikeSubmit = jest.fn()
        handleDeleteBlog = jest.fn()
        container = render(
            <Blog
                blog={blog}
                handleLikeSubmit={handleLikeSubmit}
                handleDeleteBlog={handleDeleteBlog}
            />
        ).container

        user = userEvent.setup()
        button = container.querySelector('.toggleButton')
        await user.click(button)
    })

    test('when like button is clicked the event handler is called with proper blog object', async () => {
        button = screen.getByTestId('Like')
        await user.click(button)
        await user.click(button)

        expect(handleLikeSubmit).toHaveBeenCalledWith(blog)
    })
})
