import React from 'react'
import { useForm } from 'react-hook-form'

interface StreakFormProps {
    onSubmit: (data: { name: string }) => void
}

const StreakForm: React.FC<StreakFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm<{ name: string }>()

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 bg-light-coffee-cream p-4 rounded shadow'>
            <h3 className='text-xl font-semibold mb-4'>Create Streak</h3>
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
                Create Streak
            </button>
        </form>
    )
}

export default StreakForm
