'use client'

import { useState } from 'react'
import { Expense } from './Expense/ExpensesList'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedExpense: Expense) => void
  onDelete: (id: number) => void
  expense: Expense
  isDeleteMode: boolean
}

export default function Modal({
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  expense,
  isDeleteMode
}: ModalProps) {
  const [formData, setFormData] = useState({
    amount: expense.amount,
    description: expense.description,
    date: expense.date,
    category_id: expense.category_id
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = () => {
    onUpdate({ ...expense, ...formData })
  }

  const handleDelete = () => {
    onDelete(expense.id)
  }

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
            <button
              onClick={onClose}
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
            >
              &times;
            </button>
            {isDeleteMode ? (
              <div className='flex flex-col items-center'>
                <p className='text-red-600 text-2xl mb-4'>Are you sure?</p>
                <button
                  onClick={handleDelete}
                  className='py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700'
                >
                  Delete
                </button>
                <button
                  onClick={onClose}
                  className='mt-2 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300'
                >
                  Cancel
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleUpdate()
                }}
              >
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Amount:
                  </label>
                  <input
                    type='number'
                    name='amount'
                    value={formData.amount}
                    onChange={handleChange}
                    className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
                    required
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
                    className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
                    required
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
                    className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
                    required
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
                    className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
                    required
                  >
                    <option value={1}>Category 1</option>
                    <option value={2}>Category 2</option>
                  </select>
                </div>
                <div className='mt-4 flex justify-between'>
                  <button
                    type='submit'
                    className='py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                  >
                    Update
                  </button>
                  <button
                    onClick={onClose}
                    className='py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
