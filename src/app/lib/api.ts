import axios from 'axios'

const API_BASE_URL = 'https://cs50-expense-tracker-073870393662.herokuapp.com'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// login request
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password })
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
    await api.post('/logout', {})
  } catch (error) {
    throw error
  }
}

// Fetch dashboard data
export const getDashboardData = async () => {
  try {
    const response = await api.get('/dashboard')
    return response.data
  } catch (error) {
    throw error
  }
}

// get expenses
export const getExpenses = async () => {
  try {
    const response = await api.get('/expenses')
    return response.data
  } catch (error) {
    throw error
  }
}
