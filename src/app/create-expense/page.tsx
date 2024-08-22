'use client'

import { api } from '@/app/lib/api'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import withAuth from '../lib/withAuth'

interface CreateExpenseForm {
  amount: number
  description: string
  date: string
  category_id: number
}

interface Category {
  id: number
  name: string
}

function CreateExpense() {
  const router = useRouter()
  const [formData, setFormData] = useState<CreateExpenseForm>({
    amount: 0,
    description: '',
    date: '',
    category_id: 1
  })
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get('/categories')
        setCategories(response.data.categories)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await api.post('/expenses', formData)
      router.push('/dashboard')
      setFormData({
        amount: 0,
        description: '',
        date: '',
        category_id: 1
      })
    } catch (error) {
      console.error('Error creating expense:', error)
    }
  }

  return (
    <div className='flex items-start justify-center min-h-screen pt-10'>
      <div className='w-full max-w-lg p-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>
          Create Expense
        </h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Amount:
            </label>
            <input
              type='number'
              name='amount'
              value={formData.amount}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Description:
            </label>
            <input
              type='text'
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Date:
            </label>
            <input
              type='date'
              name='date'
              value={formData.date}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Category:
            </label>
            <select
              name='category_id'
              value={formData.category_id}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  )
}

export default withAuth(CreateExpense)
