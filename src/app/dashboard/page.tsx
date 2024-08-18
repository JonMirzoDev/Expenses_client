'use client'

import { useEffect, useState } from 'react'
import CreateExpense from '../components/Expense/CreateExpense'
import ExpensesList, { Expense } from '../components/Expense/ExpensesList'
import { useAuth } from '../context/AuthContext'
import { getExpenses } from '../lib/api'
import withAuth from '../lib/withAuth'

function DashboardPage() {
  const { user, logout } = useAuth()
  const [expenses, setExpenses] = useState<Expense[] | null>(null)

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

  return (
    <main className='max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>
        Welcome to your Dashboard, {user?.username}
      </h1>
      <button
        onClick={logout}
        className='mt-8 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200'
      >
        Logout
      </button>
      <div className='mb-6'>
        <CreateExpense onAddExpense={handleAddExpense} />
      </div>
      <ExpensesList expenses={expenses} onAddExpense={handleAddExpense} />
    </main>
  )
}

export default withAuth(DashboardPage)
