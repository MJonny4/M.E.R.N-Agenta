import React from 'react'
import { useForm } from 'react-hook-form'
import { TMarket } from '../../types/types'

interface MarketFormProps {
    onSubmit: (data: { name: string }) => void
    initialValues: TMarket | null
}

const MarketForm: React.FC<MarketFormProps> = ({ onSubmit, initialValues }) => {
    const { register, handleSubmit } = useForm<{ name: string }>({
        defaultValues: initialValues || { name: '' },
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 mb-1 bg-medium-coffee-latte p-4 rounded shadow'>
            <h3 className='text-xl font-semibold mb-4'>{initialValues ? 'Edit Market' : 'Create Market'}</h3>
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
            <button type='submit' className='bg-rich-chocolate text-white px-4 py-2 rounded'>
                {initialValues ? 'Update Market' : 'Create Market'}
            </button>
        </form>
    )
}

export default MarketForm
