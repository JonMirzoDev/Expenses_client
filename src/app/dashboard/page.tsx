'use client'

import { useAuth } from '../context/AuthContext'
import withAuth from '../lib/withAuth'


function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <main>
      <h1>Welcome to your Dashboard, {user?.username}</h1>
      <button onClick={logout}>Logout</button>
    </main>
  )
}

export default withAuth(DashboardPage)
