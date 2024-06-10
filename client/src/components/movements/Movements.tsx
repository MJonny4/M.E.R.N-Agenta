import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FaFileExcel, FaTimes } from 'react-icons/fa'
import {
    getMovements,
    updateMovement,
    deleteMovement,
    addMovement,
    exportMovementsToExcel,
} from '../../services/BankService'
import { TMovement, TMovementFilters } from '../../types/types'
import MovementCard from './MovementCard'
import MovementForm from './MovementForm'
import MovementFilters from './MovementFilters'

interface MovementsProps {
    bankId: string
    setSelectedBank: (bankId: string | false) => void
}

const Movements: React.FC<MovementsProps> = ({ bankId, setSelectedBank }) => {
    const [movements, setMovements] = useState<TMovement[]>([])
    const [editMode, setEditMode] = useState<string | false>(false)
    const [filters, setFilters] = useState<TMovementFilters>({})

    useEffect(() => {
        fetchBankMovements()
    }, [bankId, filters])

    const fetchBankMovements = async () => {
        const fetchedMovements = await getMovements(bankId, filters)
        setMovements(fetchedMovements)
    }

    const handleAddMovement = async (data: Partial<TMovement>) => {
        await addMovement(bankId, data as TMovement)
        fetchBankMovements()
    }

    const handleUpdateMovement = async (data: Partial<TMovement>) => {
        if (editMode) {
            await updateMovement(bankId, editMode, data)
            setEditMode(false)
            fetchBankMovements()
        }
    }

    const handleDeleteMovement = async (id: string) => {
        await deleteMovement(bankId, id)
        fetchBankMovements()
    }

    const handleExport = () => {
        exportMovementsToExcel(bankId, filters)
    }

    const handleApplyFilters = (newFilters: TMovementFilters) => {
        setFilters(newFilters)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className='bg-light-coffee-cream rounded-lg shadow-lg p-6 max-w-7xl mx-auto overflow-y-auto'
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-3xl font-bold text-mocha-brown'>Movements</h2>
                <div className='flex items-center space-x-4'>
                    <button
                        onClick={handleExport}
                        className='flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors'
                    >
                        <FaFileExcel />
                        <span>Export</span>
                    </button>
                    <button
                        onClick={() => setSelectedBank(false)}
                        className='text-gray-500 hover:text-gray-700 transition-colors'
                    >
                        <FaTimes size={24} />
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
                <div className='lg:col-span-2'>
                    <h3 className='text-xl font-semibold text-mocha-brown mb-4'>
                        {editMode ? 'Edit Movement' : 'Add New Movement'}
                    </h3>
                    <MovementForm
                        onSubmit={editMode ? handleUpdateMovement : handleAddMovement}
                        initialData={editMode ? movements.find((m) => m._id === editMode) : undefined}
                    />
                </div>
                <div>
                    <h3 className='text-xl font-semibold text-mocha-brown mb-4'>Filter Movements</h3>
                    <MovementFilters onApplyFilters={handleApplyFilters} />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <AnimatePresence>
                    {movements.map((movement) => (
                        <MovementCard
                            key={movement._id}
                            movement={movement}
                            onEdit={() => setEditMode(movement._id)}
                            onDelete={() => handleDeleteMovement(movement._id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default Movements
