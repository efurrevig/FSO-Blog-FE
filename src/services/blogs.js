import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
    if (newToken) {
        token = `Bearer ${newToken}`
    } else {
        token = null
    }
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const edit = async (newObject, id) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
}

const destroy = async (blogId) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response.data
}

const blogService = { getAll, setToken, create, edit, destroy }

export default blogService
