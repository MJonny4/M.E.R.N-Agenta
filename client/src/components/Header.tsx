import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/store'

export default function Header() {
    const { currentUser } = useSelector((state: RootState) => state.user)

    return (
        <header className='bg-gradient-to-r from-rich-chocolate to-medium-coffee-latte'>
            <nav className='container mx-auto flex justify-between items-center'>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to='/'>
                        <img src='/logo.png' alt='Agenta Logo' className='h-24 w-24' />
                    </Link>
                </motion.div>
                <motion.ul
                    className='flex space-x-6 text-xl font-semibold'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <li>
                        <Link to='/' className='text-dark-espresso hover:text-rich-chocolate transition-colors'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/about' className='text-dark-espresso hover:text-rich-chocolate transition-colors'>
                            About
                        </Link>
                    </li>
                    {currentUser ? (
                        <>
                            <li>
                                <Link
                                    to='/profile'
                                    className='text-dark-espresso hover:text-rich-chocolate transition-colors'
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/logout'
                                    className='text-dark-espresso hover:text-rich-chocolate transition-colors'
                                >
                                    Logout
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to='/login'
                                    className='text-dark-espresso hover:text-rich-chocolate transition-colors'
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/register'
                                    className='text-dark-espresso hover:text-rich-chocolate transition-colors'
                                >
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </motion.ul>
            </nav>
        </header>
    )
}
