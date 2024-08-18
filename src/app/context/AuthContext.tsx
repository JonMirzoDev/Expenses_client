'use client'

import { useRouter } from 'next/navigation'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { logoutUser } from '../lib/api'

interface AuthContextType {
  user: { username: string; email: string } | null
  login: (userData: { username: string; email: string }) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const login = (userData: { username: string; email: string }) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    router.push('/')
  }

  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
      localStorage.removeItem('user')
      router.push('/login')
    } catch (error) {
      console.error('Failed to log out:', error)
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context == undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
