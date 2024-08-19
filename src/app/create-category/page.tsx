'use client'

import { api } from '@/app/lib/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import withAuth from '../lib/withAuth'

interface CreateCategoryForm {
  name: string
}

function CreateCategory() {
  const [formData, setFormData] = useState<CreateCategoryForm>({ name: '' })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await api.post('/categories', formData)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  return (
    <div className='flex items-start justify-center min-h-screen pt-10'>
      <div className='w-full max-w-lg p-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>
          Create Category
        </h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Category Name:
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            />
          </div>
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Create Category
          </button>
        </form>
      </div>
    </div>
  )
}

export default withAuth(CreateCategory)
