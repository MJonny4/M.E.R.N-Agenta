import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { FaChartLine, FaChevronRight, FaStore, FaTrophy, FaUtensils } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const navLinks = [
    { id: 1, title: 'Dashboard', icon: <FaChartLine />, link: '/dashboard' },
    { id: 2, title: 'Banks', icon: <FaStore />, link: '/banks' },
    { id: 3, title: 'Markets', icon: <FaStore />, link: '/markets' },
    { id: 4, title: 'Recipes', icon: <FaUtensils />, link: '/streaks' },
    { id: 5, title: 'Streaks', icon: <FaTrophy />, link: '/streaks' },
]

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true)

    const sidebarVariants = {
        open: { width: '250px', transition: { duration: 0.3 } },
        closed: { width: '100px', transition: { duration: 0.3 } },
    }

    const itemVariants = {
        open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        closed: { opacity: 0, x: -20, transition: { duration: 0.3 } },
    }

    return (
        <motion.div
            className='bg-medium-coffee-latte text-dark-espresso min-h-screen px-4 relative'
            variants={sidebarVariants}
            animate={isOpen ? 'open' : 'closed'}
        >
            <div className='flex justify-center my-3'>
                <img src='/public/logo.png' alt='Logo' className='object-cover' />
            </div>

            <nav>
                <ul className='flex flex-col items-start space-y-4'>
                    {navLinks.map((link) => (
                        <li key={link.id} className='flex items-center'>
                            <Link to={link.link} className='flex items-center gap-2'>
                                {link.icon}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.span variants={itemVariants} animate='open' exit='closed'>
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
            >
                <FaChevronRight />
            </motion.button>
        </motion.div>
    )
}

export default Sidebar
