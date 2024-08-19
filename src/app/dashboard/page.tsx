'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CategoriesList from '../components/Category/CategoriesList'
import ExpensesList, { Expense } from '../components/Expense/ExpensesList'
import { useAuth } from '../context/AuthContext'
import { getExpenses } from '../lib/api'
import withAuth from '../lib/withAuth'

function DashboardPage() {
  const { user, logout } = useAuth()
  const [expenses, setExpenses] = useState<Expense[] | null>(null)
  const [view, setView] = useState<'expenses' | 'categories'>('expenses')
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

  const handleCreateCategoryClick = () => {
    router.push('/create-category')
  }

  const handleToggleView = (view: 'expenses' | 'categories') => {
    setView(view)
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
      <div className='mb-6 flex gap-4'>
        <button
          onClick={handleCreateExpenseClick}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200'
        >
          Create Expense
        </button>
        <button
          onClick={handleCreateCategoryClick}
          className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200'
        >
          Create Category
        </button>
      </div>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-4'>
          Your {view === 'expenses' ? 'Expenses' : 'Categories'}
        </h2>
        <div className='flex space-x-4 mb-4'>
          <button
            onClick={() => handleToggleView('expenses')}
            className={`px-4 py-2 rounded ${
              view === 'expenses'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => handleToggleView('categories')}
            className={`px-4 py-2 rounded ${
              view === 'categories'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Categories
          </button>
        </div>
        {view === 'expenses' ? (
          <ExpensesList expenses={expenses} onAddExpense={handleAddExpense} />
        ) : (
          <CategoriesList />
        )}
      </div>
    </main>
  )
}

export default withAuth(DashboardPage)
