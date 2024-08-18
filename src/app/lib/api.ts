import axios, { AxiosError, AxiosRequestConfig } from 'axios'

const API_BASE_URL = 'http://localhost:5000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCsrfToken()
  },
  withCredentials: true // Ensure cookies are sent with requests
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await axios.post(`${API_BASE_URL}/refresh`, null, {
          withCredentials: true
        })

        return api(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

// Function to retrieve CSRF token from cookies
function getCsrfToken() {
  const match = document.cookie.match(
    new RegExp('(^| )csrf_access_token=([^;]+)')
  )
  return match ? match[2] : ''
}

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
