'use client'

import { api } from '@/app/lib/api'
import { useEffect, useState } from 'react'
import Modal from '../Modal'
import ExpenseItem, { Expense } from './ExpenseItem'

export default function ExpensesList() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteMode, setIsDeleteMode] = useState(false)

  useEffect(() => {
    async function fetchExpenses() {
      const response = await api.get('/expenses')
      setExpenses(response.data)
    }

    fetchExpenses()
  }, [])

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
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onUpdate={openUpdateModal}
            onDelete={openDeleteModal}
          />
        ))}
      </div>

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
