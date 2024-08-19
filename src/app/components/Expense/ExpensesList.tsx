'use client'

import { api } from '@/app/lib/api'
import { useEffect, useState } from 'react'
import Modal from '../Modal'
import ExpenseItem, { Expense } from './ExpenseItem'

export default function ExpensesList() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  )
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteMode, setIsDeleteMode] = useState(false)

  useEffect(() => {
    async function fetchCategories() {
      const response = await api.get('/categories')
      setCategories(response.data)
    }

    async function fetchExpenses() {
      let url = '/expenses'
      if (selectedCategory) {
        url += `?category_id=${selectedCategory}`
      }
      const response = await api.get(url)
      setExpenses(response.data)
    }

    fetchCategories()
    fetchExpenses()
  }, [selectedCategory])

  const handleUpdateExpense = async (updatedExpense: Expense) => {
    try {
      await api.put(`/expenses/${updatedExpense.id}`, updatedExpense)
      setExpenses(
        expenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        )
      )
      closeModal()
    } catch (error) {
      console.error('Error updating expense:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/expenses/${id}`)
      setExpenses(expenses.filter((expense) => expense.id !== id))
      closeModal()
    } catch (error) {
      console.error('Error deleting expense:', error)
    }
  }

  const openUpdateModal = (expense: Expense) => {
    setSelectedExpense(expense)
    setIsDeleteMode(false)
    setIsModalOpen(true)
  }

  const openDeleteModal = (expense: Expense) => {
    setSelectedExpense(expense)
    setIsDeleteMode(true)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedExpense(null)
  }

  return (
    <div className='p-6'>
      <div className='max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg'>
        {/* Category Filter Dropdown */}
        <div className='mb-6'>
          <label
            htmlFor='category'
            className='block text-lg font-medium text-gray-800 mb-2'
          >
            Filter by Category
          </label>
          <div className='relative'>
            <select
              id='category'
              name='category'
              value={selectedCategory || ''}
              onChange={(e) =>
                setSelectedCategory(Number(e.target.value) || null)
              }
              className='block w-full px-4 py-2 pr-8 leading-tight border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
              <option value=''>All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Expense Items */}
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onUpdate={openUpdateModal}
            onDelete={openDeleteModal}
          />
        ))}
      </div>

      {/* Modal for Updating or Deleting Expenses */}
      {selectedExpense && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onUpdateCategory={() => {}} // Not used in ExpensesList
          onUpdateExpense={handleUpdateExpense}
          onDelete={handleDelete}
          item={selectedExpense}
          isDeleteMode={isDeleteMode}
        />
      )}
    </div>
  )
}
