import React from 'react'
import { useForm } from 'react-hook-form'
import { TIngredient } from '../../types/types'

interface IngredientFormProps {
    onSubmit: (data: Partial<TIngredient>) => void
    initialValues?: TIngredient
}

const IngredientForm: React.FC<IngredientFormProps> = ({ onSubmit, initialValues }) => {
    const { register, handleSubmit } = useForm<Partial<TIngredient>>({
        defaultValues: initialValues,
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 bg-light-coffee-cream p-4 rounded shadow'>
            <h3 className='text-xl font-semibold mb-4'>{initialValues ? 'Edit Ingredient' : 'Add Ingredient'}</h3>
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
            <div className='mb-4'>
                <label htmlFor='quantity' className='block mb-1'>
                    Quantity:
                </label>
                <input
                    type='number'
                    id='quantity'
                    {...register('quantity', { required: true })}
                    className='border border-mocha-brown px-2 py-1 rounded'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='price' className='block mb-1'>
                    Price:
                </label>
                <input
                    type='number'
                    id='price'
                    {...register('price', { required: true })}
                    className='border border-mocha-brown px-2 py-1 rounded'
                />
            </div>
            <button type='submit' className='bg-rich-chocolate text-white px-4 py-2 rounded'>
                {initialValues ? 'Update Ingredient' : 'Add Ingredient'}
            </button>
        </form>
    )
}

export default IngredientForm
