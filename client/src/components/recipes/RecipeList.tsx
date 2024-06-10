import React from 'react'
import { motion } from 'framer-motion'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { TRecipe } from '../../types/types'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa6'

interface RecipeListProps {
    recipes: TRecipe[]
    onEdit: (recipe: TRecipe) => void
    onDelete: (id: string) => void
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onEdit, onDelete }) => {
    return (
        <div className='space-y-4'>
            {recipes.map((recipe) => (
                <motion.div
                    key={recipe._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-light-coffee-cream p-4 rounded shadow my-4'
                >
                    <h3 className='text-xl font-semibold mb-2 inline-flex items-center'>
                        {recipe.name}
                        <Link
                            to={`/recipes/${recipe._id}`}
                            className='bg-medium-coffee-latte text-white px-2 py-1 rounded ml-4'
                        >
                            <FaEye />
                        </Link>
                    </h3>
                    <p className='text-mocha-brown'>Calories: {recipe.calories}</p>
                    <div className='mt-4 flex space-x-2'>
                        <button
                            className='bg-medium-coffee-latte text-white px-2 py-1 rounded'
                            onClick={() => onDelete(recipe._id)}
                        >
                            <FaTrash />
                        </button>
                        <button
                            className='bg-medium-coffee-latte text-white px-2 py-1 rounded'
                            onClick={() => onEdit(recipe)}
                        >
                            <FaEdit />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default RecipeList
