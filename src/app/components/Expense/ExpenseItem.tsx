'use client'

export interface Expense {
  id: number
  description: string
  amount: number
  date: string
  category_id: number
}

interface ExpenseItemProps {
  expense: Expense
  onUpdate: (expense: Expense) => void
  onDelete: (expense: Expense) => void
}

export default function ExpenseItem({
  expense,
  onUpdate,
  onDelete
}: ExpenseItemProps) {
  const handleUpdate = () => {
    onUpdate(expense)
  }

  const handleDelete = () => {
    onDelete(expense)
  }

  return (
    <div className='flex flex-col p-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-sm'>
      <div className='flex-1'>
        <p className='text-lg font-medium text-gray-800'>
          {expense.description}
        </p>
        <p className='text-sm text-gray-500'>Amount: ${expense.amount}</p>
        <p className='text-sm text-gray-500'>Date: {expense.date}</p>
        <p className='text-sm text-gray-500'>
          Category ID: {expense.category_id}
        </p>
      </div>
      <div className='mt-4 flex justify-end space-x-2'>
        <button
          onClick={handleUpdate}
          className='py-1 px-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className='py-1 px-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
        >
          Delete
        </button>
      </div>
    </div>
  )
}
