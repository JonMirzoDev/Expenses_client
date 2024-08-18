'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { loginUser } from '../lib/api'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await loginUser(email, password)
      login(data?.user)
      console.log('Login successful:', data)
      router.push('/dashboard')
    } catch (error) {
      setError('Invalid credentials. Please try again.')
    }
  }

  const handleRegisterRedirect = () => {
    router.push('/register')
  }

  return (
    <main className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Login
          </button>
          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
          <p className='text-sm text-center mt-4'>
            Not registered yet?{' '}
            <button
              onClick={handleRegisterRedirect}
              className='text-blue-600 hover:underline'
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </main>
  )
}
