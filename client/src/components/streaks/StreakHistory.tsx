import React from 'react'
import { motion } from 'framer-motion'
import { TStreakHelper } from '../../types/types'

interface StreakHistoryProps {
    history: TStreakHelper[]
}

const StreakHistory: React.FC<StreakHistoryProps> = ({ history }) => {
    return (
        <div className='space-y-4'>
            {history.map((item) => (
                <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-light-coffee-cream p-4 rounded shadow'
                >
                    <p className='text-mocha-brown'>Date: {new Date(item.dateChecked).toLocaleDateString()}</p>
                    <p className='text-mocha-brown'>Checked: {item.checked ? 'Yes' : 'No'}</p>
                </motion.div>
            ))}
        </div>
    )
}

export default StreakHistory
