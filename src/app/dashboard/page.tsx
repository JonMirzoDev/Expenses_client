'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  console.log('user: ', user)

  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkLoggedIn() {
      const userL = localStorage.getItem('user')
      if (!userL) {
        router.push('/login')
      } else {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [router])

  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Welcome to your Dashboard, {user?.username}</h1>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </main>
  )
}
