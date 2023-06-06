import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/comments/'

const create = async (newObject) => {
    console.log('create?')
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const commentService = { create }
export default commentService