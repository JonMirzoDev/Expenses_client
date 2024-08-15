import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// login request
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post(
      '/login',
      { email, password },
      { withCredentials: true }
    )
    return response.data
  } catch (error) {
    throw error
  }
}

// registration request
export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await api.post('/register', { username, email, password })
  return response.data
}

// logout user on the server
export const logoutUser = async () => {
  try {
    await api.post('/logout', { withCredentials: true })
  } catch (error) {
    throw error
  }
}
