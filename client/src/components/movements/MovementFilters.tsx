import React, { useState } from 'react'
import { TMovementFilters } from '../../types/types'

interface MovementFiltersProps {
    onApplyFilters: (filters: TMovementFilters) => void
}

const MovementFilters: React.FC<MovementFiltersProps> = ({ onApplyFilters }) => {
    const [filters, setFilters] = useState<TMovementFilters>({})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFilters((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onApplyFilters(filters)
    }

    return (
        <form onSubmit={handleSubmit} className='bg-light-coffee-cream/50 p-4 rounded-lg shadow-md mb-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div>
                    <label htmlFor='description' className='block text-sm font-medium text-mocha-brown'>
                        Description
                    </label>
                    <input
                        type='text'
                        id='description'
                        name='description'
                        value={filters.description || ''}
                        onChange={handleInputChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-chocolate focus:ring focus:ring-rich-chocolate/50'
                    />
                </div>
                <div>
                    <label htmlFor='startDate' className='block text-sm font-medium text-mocha-brown'>
                        Start Date
                    </label>
                    <input
                        type='date'
                        id='startDate'
                        name='startDate'
                        value={filters.startDate || ''}
                        onChange={handleInputChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-chocolate focus:ring focus:ring-rich-chocolate/50'
                    />
                </div>
                <div>
                    <label htmlFor='endDate' className='block text-sm font-medium text-mocha-brown'>
                        End Date
                    </label>
                    <input
                        type='date'
                        id='endDate'
                        name='endDate'
                        value={filters.endDate || ''}
                        onChange={handleInputChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-chocolate focus:ring focus:ring-rich-chocolate/50'
                    />
                </div>
                <div>
                    <label htmlFor='operation' className='block text-sm font-medium text-mocha-brown'>
                        Operation
                    </label>
                    <select
                        id='operation'
                        name='operation'
                        value={filters.operation?.toString() || ''}
                        onChange={handleInputChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-chocolate focus:ring focus:ring-rich-chocolate/50'
                    >
                        <option value=''>All</option>
                        <option value='true'>Income</option>
                        <option value='false'>Expense</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='type' className='block text-sm font-medium text-mocha-brown'>
                        Type
                    </label>
                    <select
                        id='type'
                        name='type'
                        value={filters.type || ''}
                        onChange={handleInputChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-chocolate focus:ring focus:ring-rich-chocolate/50'
                    >
                        <option value=''>All</option>
                        <option value='rent'>Rent</option>
                        <option value='salary'>Salary</option>
                        <option value='food'>Food</option>
                        <option value='clothes'>Clothes</option>
                        <option value='other'>Other</option>
                    </select>
                </div>
            </div>
            <div className='mt-4 flex justify-end'>
                <button
                    type='submit'
                    className='bg-rich-chocolate text-light-coffee-cream px-4 py-2 rounded-md hover:bg-mocha-brown transition-colors'
                >
                    Apply Filters
                </button>
            </div>
        </form>
    )
}

export default MovementFilters
