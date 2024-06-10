import React from 'react'
import { motion } from 'framer-motion'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { TShop } from '../../types/types'
import { euroConverter } from '../../utils/money'

interface ShopListProps {
    shops: TShop[]
    onEdit: (shop: TShop) => void
    onDelete: (shopId: string) => void
}

const ShopList: React.FC<ShopListProps> = ({ shops, onEdit, onDelete }) => {
    return (
        <div className='space-y-4 p-2 shadow-lg h-80 overflow-y-auto'>
            {shops.map((shop) => (
                <motion.div
                    key={shop._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-medium-coffee-latte p-4 rounded shadow'
                >
                    <h4 className='text-lg font-semibold mb-2 text-rich-chocolate'>{shop.product}</h4>
                    <p className=''>Quantity: {shop.quantity}</p>
                    <p className=''>Price: {euroConverter(Number(shop.price))}</p>
                    <p className=''>Date: {new Date(shop.date).toLocaleDateString()}</p>
                    <div className='mt-4 flex space-x-2'>
                        <button
                            className='bg-medium-coffee-latte text-white px-2 py-1 rounded'
                            onClick={() => onDelete(shop._id)}
                        >
                            <FaTrash />
                        </button>
                        <button
                            className='bg-medium-coffee-latte text-white px-2 py-1 rounded'
                            onClick={() => onEdit(shop)}
                        >
                            <FaEdit />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default ShopList
