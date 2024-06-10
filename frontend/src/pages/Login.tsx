import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaCoffee, FaUserPlus } from 'react-icons/fa'
import { loginStart, loginSuccess, loginFailure, clearError } from '../redux/user/userSlice'
import { RootState } from '../redux/store'
import { ErrorResponse, SuccessResponse } from '../types/types'
import Header from '../components/Header'
import axiosInstance from '../utils/axios'
import axios from 'axios'

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { error, loading } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        dispatch(loginStart())

        try {
            const { data } = await axiosInstance.post<SuccessResponse>('/auth/login', formData)

            if (!data.user || !data.token) {
                dispatch(loginFailure('An unknown error occurred'))
                return
            }

            dispatch(loginSuccess(data.user))
            navigate('/dashboard')
        } catch (err) {
            let errorMessage: ErrorResponse['message']

            if (axios.isAxiosError(err) && err.response) {
                const errorData = err.response.data as ErrorResponse

                if (typeof errorData.message === 'string') {
                    errorMessage = errorData.message
                } else if (Array.isArray(errorData.message)) {
                    errorMessage = errorData.message
                } else {
                    errorMessage = 'An unknown error occurred'
                }
            } else {
                errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
            }

            dispatch(loginFailure(errorMessage))
        }
    }

    return (
        <>
            <Header />
            <motion.main
                className='min-h-screen flex justify-center bg-light-coffee-cream p-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className='bg-medium-coffee-latte p-8 rounded-lg shadow-xl max-w-md w-full h-1/2'>
                    <motion.div
                        className='flex justify-center mb-8'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
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
                        Welcome Back
                    </motion.h1>

                    {error && (
                        <motion.div
                            className='text-red-500 p-3 rounded-lg mb-4 bg-red-100'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {Array.isArray(error) ? (
                                <ul>
                                    {error.map((err, i) => (
                                        <li key={i}>{err.msg}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>{error}</p>
                            )}
                        </motion.div>
                    )}

                    <form className='space-y-4' onSubmit={handleSubmit}>
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
                        <motion.button
                            className='w-full bg-mocha-brown text-light-coffee-cream py-2 rounded-lg font-semibold hover:bg-rich-chocolate transition-colors duration-300 disabled:opacity-50'
                            disabled={loading}
                            type='submit'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {loading ? 'Brewing...' : 'Sign In'}
                        </motion.button>
                    </form>

                    <motion.div
                        className='flex gap-2 mt-6 justify-center text-dark-espresso'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <p>New to Agenta?</p>
                        <Link to='/register' className='text-rich-chocolate hover:underline flex items-center'>
                            Register <FaUserPlus className='ml-1' />
                        </Link>
                    </motion.div>
                </div>
            </motion.main>
        </>
    )
}
