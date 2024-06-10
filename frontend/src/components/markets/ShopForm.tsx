import React from 'react'
import { useForm } from 'react-hook-form'
import { TShop } from '../../types/types'

interface ShopFormProps {
    onSubmit: (data: Partial<TShop>) => void
    initialValues?: TShop
}

const ShopForm: React.FC<ShopFormProps> = ({ onSubmit, initialValues }) => {
    const { register, handleSubmit } = useForm<Partial<TShop>>({
        defaultValues: initialValues,
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 mb-4 bg-medium-coffee-latte p-4 rounded shadow'>
            <h3 className='text-xl font-semibold mb-4'>{initialValues ? 'Edit Shop' : 'Create Shop'}</h3>
            <div className='mb-4'>
                <label htmlFor='product' className='block mb-1'>
                    Product:
                </label>
                <input
                    type='text'
                    id='product'
                    {...register('product', { required: true })}
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
                    step={0.01}
                    {...register('price')}
                    className='border border-mocha-brown px-2 py-1 rounded'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='date' className='block mb-1'>
                    Date:
                </label>
                <input
                    type='date'
                    id='date'
                    {...register('date', { required: true })}
                    className='border border-mocha-brown px-2 py-1 rounded'
                />
            </div>
            <button type='submit' className='bg-rich-chocolate text-white px-4 py-2 rounded'>
                {initialValues ? 'Update Shop' : 'Create Shop'}
            </button>
        </form>
    )
}

export default ShopForm
