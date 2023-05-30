import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {
    test('updates parent states and calls onSubmit', async () => {
        const createBlog = jest.fn()
        const user = userEvent.setup()

        render(<BlogForm createBlog={createBlog} />)

        const title = screen.getByTestId('title')
        const author = screen.getByTestId('author')
        const url = screen.getByTestId('url')
        const submitButton = screen.getByText('Add Blog')

        await user.type(title, 'test blog')
        await user.type(author, 'john smith')
        await user.type(url, 'test.com')
        await user.click(submitButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('test blog')
    })
})
