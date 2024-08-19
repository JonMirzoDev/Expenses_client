'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ExpensesList, { Expense } from '../components/Expense/ExpensesList'
import { useAuth } from '../context/AuthContext'
import { getExpenses } from '../lib/api'
import withAuth from '../lib/withAuth'

function DashboardPage() {
  const { user, logout } = useAuth()
  const [expenses, setExpenses] = useState<Expense[] | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchExpenses() {
      const response = await getExpenses()
      setExpenses(response)
    }

    fetchExpenses()
  }, [])

  const handleAddExpense = () => {
    getExpenses().then(setExpenses)
  }

  const handleCreateExpenseClick = () => {
    router.push('/create-expense')
  }

  return (
    <main className='max-w-4xl mx-auto p-6 rounded-lg'>
      <nav className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>
          Welcome to your Dashboard, {user?.username}
        </h1>
        <button
          onClick={logout}
          className='mt-8 mb-12 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200'
        >
          Logout
        </button>
      </nav>
      <div className='mb-6'>
        <button
          onClick={handleCreateExpenseClick}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200'
        >
          Create Expense
        </button>
      </div>
      <h2 className='text-xl font-semibold mb-4'>Your Expenses</h2>
      <ExpensesList expenses={expenses} onAddExpense={handleAddExpense} />
    </main>
  )
}

export default withAuth(DashboardPage)
