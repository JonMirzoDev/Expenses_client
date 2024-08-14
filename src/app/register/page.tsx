'use client'

import { useState } from 'react'
import { registerUser } from '../lib/api'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await registerUser(username, email, password)
      console.log('Register successfull:', data)
      router.push('/login')
    } catch (error) {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button type='submit'>Register</button>
        {error && <p>{error}</p>}
      </form>
    </main>
  )
}
