'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleLoginClick = () => {
    router.push('/login')
  }

  return (
    <main className='flex flex-col min-h-screen bg-gray-50'>
      <header className='bg-blue-600 p-4 text-white shadow-md'>
        <nav className='container mx-auto flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Expense Tracker</h1>
          <button
            onClick={handleLoginClick}
            className='bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-md font-medium'
          >
            Login
          </button>
        </nav>
      </header>
      <div className='flex-grow flex items-center justify-center'>
        <div className='text-center p-8'>
          <h2 className='text-4xl font-bold mb-4'>
            Welcome to the Expense Tracker
          </h2>
          <p className='text-lg text-gray-700 mb-6'>
            Track your expenses effectively and efficiently. Stay on top of your
            finances and make informed decisions with ease.
          </p>
          <button
            onClick={handleLoginClick}
            className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium'
          >
            Get Started
          </button>
        </div>
      </div>
      <footer className='bg-gray-800 text-white py-4'>
        <div className='container mx-auto text-center'>
          <p>&copy; 2024 Expense Tracker. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
