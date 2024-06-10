import React from 'react'
import { motion } from 'framer-motion'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { TIngredient } from '../../types/types'

interface IngredientListProps {
    ingredients: TIngredient[]
    onEdit: (ingredient: TIngredient) => void
    onDelete: (id: string) => void
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, onEdit, onDelete }) => {
    return (
        <div className='space-y-4'>
            {ingredients.map((ingredient) => (
                <motion.div
                    key={ingredient._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-light-coffee-cream p-4 rounded shadow'
                >
                    <h4 className='text-lg font-semibold mb-2'>{ingredient.name}</h4>
                    <p className='text-mocha-brown'>Calories: {ingredient.calories}</p>
                    <p className='text-mocha-brown'>Quantity: {ingredient.quantity}</p>
                    <p className='text-mocha-brown'>Price: {ingredient.price}</p>
                    <div className='mt-4 flex space-x-2'>
                        <button
                            className='bg-medium-coffee-latte text-white px-2 py-1 rounded'
                            onClick={() => onDelete(ingredient._id)}
                        >
                            <FaTrash />
                        </button>
                        <button
                            className='bg-medium-coffee-latte text-white px-2 py-1 rounded'
                            onClick={() => onEdit(ingredient)}
                        >
                            <FaEdit />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default IngredientList
