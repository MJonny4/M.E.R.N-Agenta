import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { getMovements } from '../services/BankService'
import { Movement } from '../types/types'

interface MovementsProps {
    bankId: string
    setSelectedBank: (bankId: string | false) => void
}

const Movements: React.FC<MovementsProps> = ({ bankId, setSelectedBank }) => {
    const [movements, setMovements] = useState<Movement[]>([])
    const [selectedMovement, setSelectedMovement] = useState<string | false>(false)
    const [editMode, setEditMode] = useState<string | false>(false)
    const [editedMovement, setEditedMovement] = useState({ description: '', amount: 0 })

    useEffect(() => {
        fetchBankMovements()
    }, [])

    const fetchBankMovements = async () => {
        const fetchedMovements = await getMovements(bankId)
        setMovements(fetchedMovements)
    }

    return (
        <div className='bg-light-coffee-cream rounded shadow p-5'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold text-dark-espresso'>Movements</h2>
                <FaTimes onClick={() => setSelectedBank(false)} className='text-gray-500 cursor-pointer' />
            </div>

            <table className='w-full table border'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Operation</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movements.map((movement) => (
                        <tr key={movement._id}>
                            <td>{movement.description}</td>
                            <td>{movement.money.toFixed(2)}</td>
                            <td>{movement.type}</td>
                            <td>{movement.operation ? 'Income' : 'Expense'}</td>
                            <td>{movement.quantity}</td>
                            <td>{new Date(movement.date).toLocaleDateString()}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setSelectedMovement(movement._id)
                                        setEditMode(movement._id)
                                        setEditedMovement({ description: movement.description, amount: movement.money })
                                    }}
                                    className='bg-light-coffee-cream text-dark-espresso p-2 rounded mr-2'
                                >
                                    Edit
                                </button>
                                <button className='bg-red-500 text-light-coffee-cream p-2 rounded'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Movements
