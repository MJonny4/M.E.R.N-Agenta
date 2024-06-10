import React from 'react'
import { useForm } from 'react-hook-form'
import { TRecipe } from '../../types/types'

interface RecipeFormProps {
    onSubmit: (data: Partial<TRecipe>) => void
    initialValues?: TRecipe
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, initialValues }) => {
    const { register, handleSubmit } = useForm<Partial<TRecipe>>({
        defaultValues: initialValues,
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 bg-light-coffee-cream p-4 rounded shadow'>
            <h3 className='text-xl font-semibold mb-4'>{initialValues ? 'Edit Recipe' : 'Create Recipe'}</h3>
            <div className='mb-4'>
                <label htmlFor='name' className='block mb-1'>
                    Name:
                </label>
                <input
                    type='text'
                    id='name'
                    {...register('name', { required: true })}
                    className='border border-mocha-brown px-2 py-1 rounded'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='calories' className='block mb-1'>
                    Calories:
                </label>
                <input
                    type='number'
                    id='calories'
                    {...register('calories', { required: true })}
                    className='border border-mocha-brown px-2 py-1 rounded'
                />
            </div>
            <button type='submit' className='bg-rich-chocolate text-white px-4 py-2 rounded'>
                {initialValues ? 'Update Recipe' : 'Create Recipe'}
            </button>
        </form>
    )
}

export default RecipeForm
