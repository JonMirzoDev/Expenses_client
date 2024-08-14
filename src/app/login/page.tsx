'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { loginUser } from '../lib/api'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await loginUser(email, password)
      console.log('Login successfull:', data)
      router.push('/')
    } catch (error) {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
        {error && <p>{error}</p>}
      </form>
    </main>
  )
}
