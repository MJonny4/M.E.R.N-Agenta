import React from 'react'
import { useForm } from 'react-hook-form'
import { TStep } from '../../types/types'

interface StepFormProps {
    onSubmit: (data: Partial<TStep>) => void
    initialValues?: TStep
}

const StepForm: React.FC<StepFormProps> = ({ onSubmit, initialValues }) => {
    const { register, handleSubmit } = useForm<Partial<TStep>>({
        defaultValues: initialValues,
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 bg-light-coffee-cream p-4 rounded shadow'>
            <h3 className='text-xl font-semibold mb-4'>{initialValues ? 'Edit Step' : 'Add Step'}</h3>
            <div className='mb-4'>
                <label htmlFor='description' className='block mb-1'>
                    Description:
                </label>
                <textarea
                    id='description'
                    {...register('description', { required: true })}
                    className='border border-mocha-brown px-2 py-1 rounded'
                ></textarea>
            </div>
            <div className='mb-4'>
                <label htmlFor='order' className='block mb-1'>
                    Order:
                </label>
                <input
                    type='number'
                    id='order'
                    {...register('order', { required: true })}
                    className='border border-mocha-brown px-2 py-1 rounded'
                />
            </div>
            <button type='submit' className='bg-rich-chocolate text-white px-4 py-2 rounded'>
                {initialValues ? 'Update Step' : 'Add Step'}
            </button>
        </form>
    )
}

export default StepForm
