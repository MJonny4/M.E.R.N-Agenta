import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { FaUniversity } from 'react-icons/fa'
import { FaChartLine, FaChevronRight, FaDoorOpen, FaFire, FaStore, FaUser, FaUtensils } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const navLinks = [
    { id: 1, title: 'Dashboard', icon: <FaChartLine />, link: '/dashboard' },
    { id: 2, title: 'Banks', icon: <FaUniversity />, link: '/banks' },
    { id: 3, title: 'Markets', icon: <FaStore />, link: '/markets' },
    { id: 4, title: 'Recipes', icon: <FaUtensils />, link: '/recipes' },
    { id: 5, title: 'Streaks', icon: <FaFire />, link: '/streaks' },
    { id: 6, title: 'Profile', icon: <FaUser />, link: '/profile' },
    { id: 7, title: 'Logout', icon: <FaDoorOpen />, link: '/logout' },
]

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true)

    const sidebarVariants = {
        open: { width: '250px', transition: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.67] } },
        closed: { width: '80px', transition: { duration: 0.6, ease: [0.17, 0.67, 0.83, 0.67] } },
    }

    const itemVariants = {
        open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
        closed: { opacity: 0, x: -20, transition: { duration: 0.3, ease: 'easeIn' } },
    }

    return (
        <motion.div
            className='bg-medium-coffee-latte text-dark-espresso min-h-screen px-4 relative'
            variants={sidebarVariants}
            animate={isOpen ? 'open' : 'closed'}
        >
            <div className='flex justify-center my-6'>
                <img src='/logo.png' alt='Logo' className='w-28 h-28 object-contain' />
            </div>

            <nav>
                <ul className='flex flex-col items-start space-y-6'>
                    {navLinks.map((link) => (
                        <li key={link.id} className={`flex w-full ${isOpen ? 'justify-start' : 'justify-center'}`}>
                            <Link to={link.link} className='flex items-center gap-3 group'>
                                <motion.div
                                    className='text-2xl p-2 bg-light-coffee-cream rounded-lg shadow-md group-hover:shadow-lg group-hover:bg-rich-chocolate group-hover:text-light-coffee-cream transition-all duration-300 ease-out'
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {link.icon}
                                </motion.div>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.span
                                            variants={itemVariants}
                                            initial='closed'
                                            animate='open'
                                            exit='closed'
                                            className='whitespace-nowrap text-lg font-medium text-mocha-brown hover:text-rich-chocolate transition-colors duration-300 ease-out'
                                        >
                                            {link.title}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <motion.button
                className='absolute top-1 -right-4 bg-light-coffee-cream p-3 rounded-full shadow-lg text-mocha-brown hover:bg-rich-chocolate hover:text-light-coffee-cream transition-colors duration-300 ease-out'
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1, rotate: isOpen ? 180 : 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] }}
            >
                <FaChevronRight />
            </motion.button>
        </motion.div>
    )
}

export default Sidebar
