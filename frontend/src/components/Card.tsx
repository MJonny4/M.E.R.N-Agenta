import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'

interface CardProps {
    title: string
    description: string
    icon: ReactNode
}

const Card: FC<CardProps> = ({ title, description, icon }) => {
    return (
        <motion.div
            className='bg-medium-coffee-latte p-8 rounded-lg shadow-md text-dark-espresso text-center  '
            whileHover={{ scale: 1.02, boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' }}
            transition={{ type: 'spring', stiffness: 100 }}
        >
            <motion.div
                className='text-4xl mb-6'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 70, delay: 0.1 }}
            >
                {icon}
            </motion.div>
            <h3 className='text-2xl mb-4 font-semibold text-mocha-brown'>{title}</h3>
            <p className='text-base'>{description}</p>
        </motion.div>
    )
}

export default Card
