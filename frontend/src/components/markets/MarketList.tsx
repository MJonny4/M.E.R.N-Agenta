import React from 'react'
import { motion } from 'framer-motion'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { TMarket } from '../../types/types'

interface MarketListProps {
    markets: TMarket[]
    onEdit: (market: TMarket) => void
    onDelete: (id: string) => void
}

const MarketList: React.FC<MarketListProps> = ({ markets, onEdit, onDelete }) => {
    return (
        <div className='space-y-4 my-4'>
            {markets.map((market) => (
                <motion.div
                    key={market._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-medium-coffee-latte p-4 rounded shadow'
                >
                    <h3 className='text-xl font-semibold mb-2'>{market.name}</h3>
                    <div className='mt-4 flex space-x-2'>
                        <button
                            className='bg-medium-coffee-latte text-white px-2 py-1 rounded'
                            onClick={() => onDelete(market._id)}
                        >
                            <FaTrash />
                        </button>
                        <button
                            className='bg-medium-coffee-latte text-white px-2 py-1 rounded'
                            onClick={() => onEdit(market)}
                        >
                            <FaEdit />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default MarketList
