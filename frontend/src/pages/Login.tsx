import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInSuccess, signInFailure, signInStart } from '../redux/user/userSlice'
import { RootState } from '../redux/store'

export default function Login() {
    const [formData, setFormData] = useState({})

    const { error, loading } = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(signInStart())

        try {
            const res: Response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!data.user) {
                dispatch(signInFailure(data.message))
                return
            }

            dispatch(signInSuccess(data.user))
            navigate('/')
        } catch (err: unknown) {
            const error = err as Error
            dispatch(signInFailure(error.message))
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            {Array.isArray(error) ? (
                <ul className='text-red-500 p-3 rounded-lg my-4 bg-red-100'>
                    {error.map((err, i) => (
                        <li key={i}>{err.msg}</li>
                    ))}
                </ul>
            ) : (
                <p className='text-red-500 p-3 rounded-lg my-4 bg-red-100'>{error}</p>
            )}
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input
                    type='email'
                    className='border p-3 rounded-lg'
                    placeholder='email'
                    id='email'
                    onChange={handleChange}
                />
                <input
                    type='password'
                    className='border p-3 rounded-lg'
                    placeholder='password'
                    id='password'
                    onChange={handleChange}
                />
                <button
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </form>
        </div>
    )
}
