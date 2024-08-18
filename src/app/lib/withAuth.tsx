import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ProtectedComponent = (props: any) => {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login')
      }
    }, [loading, user, router])

    if (loading) {
      return <p>Loading...</p> // Or a spinner component
    }

    if (!user) return null

    return <WrappedComponent {...props} />
  }

  return ProtectedComponent
}

export default withAuth
