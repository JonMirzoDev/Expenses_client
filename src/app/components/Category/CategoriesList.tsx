'use client'

import { api } from '@/app/lib/api'
import { useEffect, useState } from 'react'
import Modal from '../Modal'

export interface Category {
  id: number
  name: string
}

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const perPage = 5

  useEffect(() => {
    async function fetchCategories() {
      const response = await api.get(
        `/categories?page=${currentPage}&per_page=${perPage}`,
        { withCredentials: true }
      )
      console.log('response categories: ', response)
      setCategories(response.data.categories)
      setTotalPages(Math.ceil(response.data.total / perPage))
    }

    fetchCategories()
  }, [currentPage])

  const handleUpdateCategory = async (updatedCategory: Category) => {
    try {
      await api.put(`/categories/${updatedCategory.id}`, updatedCategory)
      setCategories(
        categories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        )
      )
      closeModal()
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/categories/${id}`)
      setCategories(categories.filter((category) => category.id !== id))
      closeModal()
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  const openUpdateModal = (category: Category) => {
    setSelectedCategory(category)
    setIsDeleteMode(false)
    setIsModalOpen(true)
  }

  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category)
    setIsDeleteMode(true)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCategory(null)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className='p-6'>
      <div className='max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg'>
        <table className='min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-left text-gray-600 font-medium border-b'>
                ID
              </th>
              <th className='py-3 px-4 text-left text-gray-600 font-medium border-b'>
                Name
              </th>
              <th className='py-3 px-4 text-left text-gray-600 font-medium border-b'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className='cursor-pointer hover:bg-gray-100'
              >
                <td className='py-2 px-4 border-b'>{category.id}</td>
                <td className='py-2 px-4 border-b'>{category.name}</td>
                <td className='py-2 px-4 border-b'>
                  {/* <button
                    onClick={() => openUpdateModal(category)}
                    className='py-1 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                  >
                    Update
                  </button> */}
                  <button
                    onClick={() => openDeleteModal(category)}
                    className='ml-2 py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {categories.length > 0 && (
          <div className='flex justify-between items-center mt-4'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`py-2 px-4 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>
            <span className='text-gray-600'>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || categories.length === 0}
              className={`py-2 px-4 rounded-md ${
                currentPage === totalPages || categories.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {selectedCategory && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onUpdateCategory={handleUpdateCategory}
          onUpdateExpense={() => {}}
          onDelete={handleDelete}
          item={selectedCategory}
          isDeleteMode={isDeleteMode}
        />
      )}
    </div>
  )
}
