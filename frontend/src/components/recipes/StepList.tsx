import React from 'react'
import { motion } from 'framer-motion'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { TStep } from '../../types/types'

interface StepListProps {
    steps: TStep[]
    onEdit: (step: TStep) => void
    onDelete: (id: string) => void
}

const StepList: React.FC<StepListProps> = ({ steps, onEdit, onDelete }) => {
    return (
        <div className='space-y-4'>
            {steps.map((step) => (
                <motion.div
                    key={step._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-light-coffee-cream p-4 rounded shadow'
                >
                    <h4 className='text-lg font-semibold mb-2'>Step {step.order}</h4>
                    <p className='text-mocha-brown'>{step.description}</p>
                    <div className='mt-4 flex space-x-2'>
                        <button
                            className='bg-medium-coffee-latte text-white px-2 py-1 rounded'
                            onClick={() => onDelete(step._id)}
                        >
                            <FaTrash />
                        </button>
                        <button
                            className='bg-medium-coffee-latte text-white px-2 py-1 rounded'
                            onClick={() => onEdit(step)}
                        >
                            <FaEdit />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default StepList
