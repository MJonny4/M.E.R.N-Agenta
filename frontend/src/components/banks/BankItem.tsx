import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaCheck, FaEye, FaPencil, FaXmark } from 'react-icons/fa6'
import { euroConverter } from '../../utils/money'

type BankItemProps = {
    bank: {
        _id: string
        name: string
        balance: number
    }
    onDelete: (id: string) => void
    onEdit: (id: string, editedBank: { name: string; balance: number }) => void
    onSelect: (id: string) => void
}

const BankItem = ({ bank, onDelete, onEdit, onSelect }: BankItemProps) => {
    const [editMode, setEditMode] = useState(false)
    const [editedBank, setEditedBank] = useState({ name: bank.name, balance: bank.balance })

    const handleSaveEdit = () => {
        onEdit(bank._id, editedBank)
        setEditMode(false)
    }

    return (
        <motion.article
            key={bank._id}
            className='mb-4 p-4 bg-medium-coffee-latte rounded h-fit'
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
        >
            {editMode ? (
                <>
                    <h3 className='text-xl font-semibold'>Editing...</h3>
                    <label className='font-semibold flex flex-col'>
                        Name:
                        <input
                            type='text'
                            value={editedBank.name}
                            onChange={(e) => setEditedBank({ ...editedBank, name: e.target.value })}
                            className='p-2 border border-mocha-brown rounded'
                        />
                    </label>
                    <label className='font-semibold flex flex-col'>
                        Balance:
                        <input
                            type='number'
                            value={editedBank.balance}
                            onChange={(e) => setEditedBank({ ...editedBank, balance: parseFloat(e.target.value) })}
                            className='p-2 border border-mocha-brown rounded'
                        />
                    </label>
                    <div className='flex justify-center items-center gap-10 text-5xl py-4'>
                        <FaCheck onClick={handleSaveEdit} className='text-green-500 cursor-pointer inline-block' />
                        <FaXmark
                            onClick={() => setEditMode(false)}
                            className='text-red-500 cursor-pointer inline-block ml-2'
                        />
                    </div>
                </>
            ) : (
                <div className='flex flex-col'>
                    <div className='flex items-center gap-2'>
                        <h3 className='text-xl font-semibold'>{bank.name}</h3>
                        <FaEye
                            onClick={() => onSelect(bank._id)}
                            className='text-gray-700 cursor-pointer inline-block text-xl'
                        />
                    </div>
                    <p>Balance: {euroConverter(bank.balance)}</p>
                    <div className='flex justify-between items-center'>
                        <FaPencil
                            onClick={() => setEditMode(true)}
                            className='text-gray-700 cursor-pointer inline-block'
                        />
                        <button
                            onClick={() => onDelete(bank._id)}
                            className='bg-red-500 text-light-coffee-cream p-2 rounded ml-4'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </motion.article>
    )
}

export default BankItem
