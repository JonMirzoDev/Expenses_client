import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getRefreshToken, validateRefreshToken } from './utils'

const API_BASE_URL = 'http://localhost:5000'

// Function to retrieve CSRF token from cookies
function getCsrfToken() {
  const match = document.cookie.match(
    new RegExp('(^| )csrf_access_token=([^;]+)')
  )
  return match ? match[2] : ''
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

api.interceptors.request.use((config) => {
  config.headers['X-CSRF-Token'] = getCsrfToken()
  return config
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
        console.log('Attempting token refresh...')

        const refreshToken = getRefreshToken()

        if (validateRefreshToken(refreshToken)) {
          // Retrieve the CSRF token
          const csrfToken = getCsrfToken()

          const refreshResponse = await axios.post(
            `${API_BASE_URL}/refresh`,
            null,
            {
              withCredentials: true,
              headers: {
                'X-CSRF-Token': csrfToken
              }
            }
          )

          console.log('Refresh response:', refreshResponse.data)
          return api(originalRequest)
        } else {
          console.error('Refresh token is invalid or expired')

          // Logout user and redirect to login page
          try {
            await logoutUser()
          } catch (logoutError) {
            console.error('Logout failed:', logoutError)
          }

          if (typeof window !== 'undefined') {
            window.location.href = '/'
          }

          return Promise.reject('Refresh token is invalid or expired')
        }
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError)

        // Logout user and redirect to login page
        try {
          await logoutUser()
        } catch (logoutError) {
          console.error('Logout failed:', logoutError)
        }

        if (typeof window !== 'undefined') {
          window.location.href = '/'
        }

        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

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
