import React from 'react'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'
import { TStreak } from '../../types/types'

interface StreakListProps {
    streaks: TStreak[]
    onCheckIn: (id: string) => void
    onViewHistory: (id: string) => void
}

const StreakList: React.FC<StreakListProps> = ({ streaks, onCheckIn, onViewHistory }) => {
    return (
        <div className='space-y-4'>
            {streaks.map((streak) => (
                <motion.div
                    key={streak._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-light-coffee-cream p-4 rounded shadow'
                >
                    <h3 className='text-xl font-semibold mb-2'>{streak.name}</h3>
                    <p className='text-mocha-brown'>Count: {streak.count}</p>
                    <div className='mt-4 flex space-x-2'>
                        <button
                            className='bg-medium-coffee-latte text-white px-2 py-1 rounded'
                            onClick={() => onCheckIn(streak._id)}
                        >
                            <FaCheck />
                        </button>
                        <button
                            className='bg-medium-coffee-latte text-white px-2 py-1 rounded'
                            onClick={() => onViewHistory(streak._id)}
                        >
                            View History
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default StreakList
