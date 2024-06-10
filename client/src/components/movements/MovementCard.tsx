import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { TMovement } from '../../types/types'
import { formatDate } from '../../utils/data'
import { euroConverter } from '../../utils/money'

interface MovementCardProps {
    movement: TMovement
    onEdit: () => void
    onDelete: () => void
}

const MovementCard: React.FC<MovementCardProps> = ({ movement, onEdit, onDelete }) => {
    const isIncome = movement.operation

    return (
        <motion.div
            className={`bg-white shadow-md rounded-lg p-4 flex flex-col w-64 ${
                isIncome ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
            }`}
            whileHover={{ scale: 1.02, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
            <div className='flex justify-between items-center mb-2'>
                <div className='flex items-center space-x-2'>
                    <h3
                        className={`text-lg font-semibold inline-flex items-center ${
                            isIncome ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {isIncome ? '+' : '-'}
                        {euroConverter(movement.money)}
                    </h3>
                    <span className='text-mocha-brown text-sm font-bold'>( {movement.quantity} )</span>
                </div>
                <div className='flex space-x-2'>
                    <button onClick={onEdit} className='text-mocha-brown hover:text-rich-chocolate transition-colors'>
                        <FaEdit />
                    </button>
                    <button onClick={onDelete} className='text-red-500 hover:text-red-600 transition-colors'>
                        <FaTrash />
                    </button>
                </div>
            </div>
            <p className='text-dark-espresso font-medium mb-1'>{movement.description}</p>
            <div className='flex justify-between text-sm text-mocha-brown'>
                <span>{formatDate(movement.date)}</span>
                <span className='px-2 py-0.5 bg-light-coffee-cream rounded-full'>{movement.type}</span>
            </div>
        </motion.div>
    )
}

export default MovementCard
