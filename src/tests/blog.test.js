import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'


describe('<Blog />', () => {

    let container

    const blog = {
        title: 'testing...',
        author: 'test author',
        url: 'test.com',
        likes: 1,
        user: { username: 'root', name: 'John Smith' }
    }
    beforeEach(() => {
        const mockSetBlogs = jest.fn()
        container = render(
            <Blog blog={blog} blogs={[]} setBlogs={mockSetBlogs} />
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