import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock, FaCoffee, FaSignInAlt } from 'react-icons/fa'
import { registerStart, registerSuccess, registerFailure, clearError } from '../redux/user/userSlice'
import { RootState } from '../redux/store'
import { LoginResponse } from '../types/types'

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [success, setSuccess] = useState<string | null>(null)
    const { error, loading } = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearError())
    }, [dispatch])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(registerStart())

        if (formData.password !== formData.confirmPassword) {
            dispatch(registerFailure([{ msg: 'No matching passwords' }]))
            return
        }

        try {
            const res = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            })

            const data: LoginResponse = await res.json()

            if (res.ok) {
                dispatch(registerSuccess())
                setSuccess('Account created successfully!')
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            } else {
                dispatch(registerFailure(data.message || 'An error occurred'))
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
            dispatch(registerFailure(errorMessage))
        }
    }

    return (
        <motion.div
            className='min-h-screen flex justify-center bg-light-coffee-cream p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className='bg-medium-coffee-latte p-8 rounded-lg shadow-xl max-w-xl w-full h-1/2'>
                <motion.div
                    className='flex justify-center mb-8'
                    initial={{ rotate: -45, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
                >
                    <FaCoffee className='text-5xl text-rich-chocolate' />
                </motion.div>
                <motion.h1
                    className='text-3xl text-center font-semibold mb-6 text-mocha-brown'
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    Join the Coffee Club
                </motion.h1>

                {error && (
                    <motion.div
                        className='text-red-500 p-3 rounded-lg mb-4 bg-red-100'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {Array.isArray(error) ? (
                            <ul className='list-disc list-inside'>
                                {error.map((err, i) => (
                                    <li key={i}>{err.msg}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>{error}</p>
                        )}
                    </motion.div>
                )}

                {success && (
                    <motion.div
                        className='text-green-500 p-3 rounded-lg mb-4 bg-green-100'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p>{success}</p>
                    </motion.div>
                )}

                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='relative'>
                        <FaUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-espresso' />
                        <input
                            type='text'
                            className='w-full pl-10 pr-3 py-2 rounded-lg border-2 border-dark-espresso bg-light-coffee-cream text-dark-espresso placeholder-dark-espresso/70 focus:outline-none focus:border-mocha-brown'
                            placeholder='Username'
                            id='username'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='relative'>
                        <FaEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-espresso' />
                        <input
                            type='email'
                            className='w-full pl-10 pr-3 py-2 rounded-lg border-2 border-dark-espresso bg-light-coffee-cream text-dark-espresso placeholder-dark-espresso/70 focus:outline-none focus:border-mocha-brown'
                            placeholder='Email'
                            id='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='relative'>
                        <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-espresso' />
                        <input
                            type='password'
                            className='w-full pl-10 pr-3 py-2 rounded-lg border-2 border-dark-espresso bg-light-coffee-cream text-dark-espresso placeholder-dark-espresso/70 focus:outline-none focus:border-mocha-brown'
                            placeholder='Password'
                            id='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                        />
                    </div>
                    <div className='relative'>
                        <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-espresso' />
                        <input
                            type='password'
                            className='w-full pl-10 pr-3 py-2 rounded-lg border-2 border-dark-espresso bg-light-coffee-cream text-dark-espresso placeholder-dark-espresso/70 focus:outline-none focus:border-mocha-brown'
                            placeholder='Repeat Password'
                            id='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength={8}
                        />
                    </div>
                    <motion.button
                        className='w-full bg-mocha-brown text-light-coffee-cream py-2 rounded-lg font-semibold hover:bg-rich-chocolate transition-colors duration-300 disabled:opacity-50'
                        disabled={loading}
                        type='submit'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {loading ? 'Brewing your account...' : 'Sign Up'}
                    </motion.button>
                </form>

                <motion.div
                    className='flex gap-2 mt-6 justify-center text-dark-espresso'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <p>Already a member?</p>
                    <Link to='/login' className='text-rich-chocolate hover:underline flex items-center'>
                        Sign In <FaSignInAlt className='ml-1' />
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    )
}
