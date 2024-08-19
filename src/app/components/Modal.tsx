'use client'

import { useState } from 'react'
import { Category } from './Category/CategoriesList'
import { Expense } from './Expense/ExpenseItem'

type Item = Expense | Category

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdateCategory: (updatedCategory: Category) => void
  onUpdateExpense: (updatedExpense: Expense) => void
  onDelete: (id: number) => void
  item: Item
  isDeleteMode: boolean
}

export default function Modal({
  isOpen,
  onClose,
  onUpdateCategory,
  onUpdateExpense,
  onDelete,
  item,
  isDeleteMode
}: ModalProps) {
  const [formData, setFormData] = useState({
    description: 'description' in item ? item.description : '',
    amount: 'amount' in item ? item.amount : 0,
    date: 'date' in item ? item.date : '',
    category_id: 'category_id' in item ? item.category_id : 0,
    name: 'name' in item ? item.name : ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = () => {
    if ('description' in item) {
      // It's an Expense
      onUpdateExpense({ ...item, ...formData } as Expense)
    } else {
      // It's a Category
      onUpdateCategory({ ...item, ...formData } as Category)
    }
  }

  const handleDelete = () => {
    onDelete(item.id)
  }

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative'>
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
                {'description' in item ? (
                  <>
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
                        Category ID:
                      </label>
                      <input
                        type='number'
                        name='category_id'
                        value={formData.category_id}
                        onChange={handleChange}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
                        required
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Name:
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
                      required
                    />
                  </div>
                )}
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
