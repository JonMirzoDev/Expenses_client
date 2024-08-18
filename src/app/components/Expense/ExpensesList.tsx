'use client'

import { api } from '@/app/lib/api'
import { useState } from 'react'
import Modal from '../Modal'
import ExpenseItem from './ExpenseItem'

export interface Expense {
  id: number
  amount: number
  description: string
  date: string
  category_id: number
  user_id: number
}

interface ExpensesListProps {
  expenses: Expense[] | null
  onAddExpense: () => void
}

export default function ExpensesList({
  expenses,
  onAddExpense
}: ExpensesListProps) {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteMode, setIsDeleteMode] = useState(false)

  const handleUpdate = async (updatedExpense: Expense) => {
    try {
      await api.put(`/expenses/${updatedExpense.id}`, updatedExpense)
      onAddExpense()
      closeModal()
    } catch (error) {
      console.error('Error updating expense:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/expenses/${id}`)
      onAddExpense()
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
    <>
      <div className='mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {expenses?.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onUpdate={openUpdateModal}
            onDelete={openDeleteModal}
          />
        ))}
      </div>
      {isModalOpen && selectedExpense && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          expense={selectedExpense}
          isDeleteMode={isDeleteMode}
        />
      )}
    </>
  )
}
