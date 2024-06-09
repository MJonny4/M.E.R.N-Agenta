import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { FaUniversity } from 'react-icons/fa'
import { FaChartLine, FaChevronRight, FaDoorOpen, FaFire, FaStore, FaUser, FaUtensils } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const navLinks = [
    { id: 1, title: 'Dashboard', icon: <FaChartLine />, link: '/dashboard' },
    { id: 2, title: 'Banks', icon: <FaUniversity />, link: '/banks' },
    { id: 3, title: 'Markets', icon: <FaStore />, link: '/markets' },
    { id: 4, title: 'Recipes', icon: <FaUtensils />, link: '/streaks' },
    { id: 5, title: 'Streaks', icon: <FaFire />, link: '/streaks' },
    { id: 6, title: 'Profile', icon: <FaUser />, link: '/profile' },
    { id: 7, title: 'Logout', icon: <FaDoorOpen />, link: '/logout' },
]

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true)

    const sidebarVariants = {
        open: { width: '250px', transition: { duration: 0.5, ease: 'easeInOut' } },
        closed: { width: '80px', transition: { duration: 0.5, ease: 'easeInOut' } },
    }

    const itemVariants = {
        open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
        closed: { opacity: 0, x: -20, transition: { duration: 0.25, ease: 'easeIn' } },
    }

    return (
        <motion.div
            className='bg-medium-coffee-latte text-dark-espresso min-h-screen px-4 relative'
            variants={sidebarVariants}
            animate={isOpen ? 'open' : 'closed'}
        >
            <div className='flex justify-center my-3'>
                <img src='/logo.png' alt='Logo' className='w-24 h-24 object-contain' />
            </div>

            <nav>
                {/* HOVER TO SHOW WHCIH IS WHICH */}
                <ul className='flex flex-col items-start space-y-4'>
                    {navLinks.map((link) => (
                        <li key={link.id} className={`flex w-full ${isOpen ? 'justify-start' : 'justify-center'}`}>
                            <Link to={link.link} className='flex items-center gap-2'>
                                <span className='text-2xl'>{link.icon}</span>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.span
                                            variants={itemVariants}
                                            initial='closed'
                                            animate='open'
                                            exit='closed'
                                            className='whitespace-nowrap'
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
                className='absolute top-1/2 -right-3 bg-medium-coffee-latte p-2 rounded-full shadow-md text-dark-espresso'
                onClick={() => setIsOpen(!isOpen)}
                whileHover={isOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <FaChevronRight />
            </motion.button>
        </motion.div>
    )
}

export default Sidebar
