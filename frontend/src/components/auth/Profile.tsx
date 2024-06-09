import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaCoffee } from 'react-icons/fa'
import { RootState } from '../../redux/store'
import Logout from './Logout'

const Profile: React.FC = () => {
    const { currentUser } = useSelector((state: RootState) => state.user)

    if (!currentUser) {
        return <div>Loading...</div> // or redirect to login
    }

    return (
        <motion.div
            className='min-h-screen bg-light-coffee-cream p-4 md:p-12 flex flex-col justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className='bg-medium-coffee-latte p-8 rounded-xl shadow-2xl max-w-md w-full flex flex-col items-center h-1/2'
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
            >
                <motion.div
                    className='w-32 h-32 bg-light-coffee-cream rounded-full flex items-center justify-center mb-6 shadow-md'
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                >
                    <FaUser className='text-5xl text-mocha-brown' />
                </motion.div>
                <h1 className='text-3xl font-bold text-dark-espresso mb-4'>{currentUser.username}</h1>
                <motion.div
                    className='flex items-center mb-6 text-dark-espresso'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <FaEnvelope className='mr-2' />
                    <p>{currentUser.email}</p>
                </motion.div>
                <motion.div
                    className='p-4 bg-light-coffee-cream rounded-lg shadow text-center'
                    whileHover={{ scale: 1.03 }}
                >
                    <p className='text-mocha-brown mb-2'>Daily Coffee Count</p>
                    <div className='flex items-center justify-center text-rich-chocolate'>
                        <FaCoffee className='mr-2' />
                        <span className='text-2xl font-bold'>3</span>
                    </div>
                </motion.div>
                <div className='mt-8 w-full'>
                    <Logout />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Profile
