import React, { useState, useEffect } from 'react'
import { Bank } from '../types/types'
import { getBanks, createBank, updateBank, deleteBank } from '../services/BankService'
import Movements from '../components/Movements'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEye, FaPencil, FaCheck, FaXmark } from 'react-icons/fa6'

const Banks: React.FC = () => {
    const [banks, setBanks] = useState<Bank[]>([])
    const [selectedBank, setSelectedBank] = useState<string | false>(false)
    const [editMode, setEditMode] = useState<string | false>(false)
    const [editedBank, setEditedBank] = useState({ name: '', balance: 0 })
    const [newBank, setNewBank] = useState({ name: '', balance: 0 })

    useEffect(() => {
        fetchBanks()
    }, [])

    const fetchBanks = async () => {
        const fetchedBanks = await getBanks()
        setBanks(fetchedBanks)
    }

    const handleCreateBank = async () => {
        const createdBank = await createBank(newBank.name, newBank.balance)
        setBanks([...banks, createdBank])
        setNewBank({ name: '', balance: 0 })
    }

    const handleDeleteBank = async (id: string) => {
        await deleteBank(id)
        setBanks(banks.filter((bank) => bank._id !== id))
        if (selectedBank === id) setSelectedBank(false)
    }

    const handleEditBank = (bank: Bank) => {
        setEditMode(bank._id)
        setEditedBank({ name: bank.name, balance: bank.balance })
    }

    const handleSaveEdit = async (id: string) => {
        const updatedBank = await updateBank(id, editedBank.name, editedBank.balance)
        setBanks(banks.map((bank) => (bank._id === id ? updatedBank : bank)))
        setEditMode(false)
    }

    const handleCancelEdit = () => {
        setEditMode(false)
    }

    return (
        <>
            <h1 className='text-4xl font-bold mb-8'>Banks</h1>

            <section className='flex justify-start items-end gap-4 mb-8'>
                <label className='font-semibold flex flex-col'>
                    New bank name:
                    <input
                        type='text'
                        value={newBank.name}
                        onChange={(e) => setNewBank({ ...newBank, name: e.target.value })}
                        className='p-2 border border-mocha-brown rounded'
                    />
                </label>

                <label className='font-semibold flex flex-col'>
                    Balance
                    <input
                        type='number'
                        placeholder='Initial Balance'
                        value={newBank.balance}
                        onChange={(e) => setNewBank({ ...newBank, balance: parseFloat(e.target.value) })}
                        className='p-2 border border-mocha-brown rounded'
                    />
                </label>

                <button
                    onClick={handleCreateBank}
                    className='bg-rich-chocolate text-light-coffee-cream p-2 rounded border border-mocha-brown hover:bg-mocha-brown transition-colors'
                >
                    Create Bank
                </button>
            </section>

            <h2 className='text-2xl font-bold mb-4 text-dark-espresso'>Your Banks</h2>
            <section className='grid grid-cols-3 gap-8'>
                {banks.map((bank) => (
                    <motion.article
                        key={bank._id}
                        className='mb-4 p-4 bg-medium-coffee-latte rounded h-fit'
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        {editMode === bank._id ? (
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
                                        onChange={(e) =>
                                            setEditedBank({ ...editedBank, balance: parseFloat(e.target.value) })
                                        }
                                        className='p-2 border border-mocha-brown rounded'
                                    />
                                </label>
                                <div className='flex justify-center items-center gap-10 text-5xl py-4'>
                                    <FaCheck
                                        onClick={() => handleSaveEdit(bank._id)}
                                        className='text-green-500 cursor-pointer inline-block'
                                    />
                                    <FaXmark
                                        onClick={handleCancelEdit}
                                        className='text-red-500 cursor-pointer inline-block ml-2'
                                    />
                                </div>
                            </>
                        ) : (
                            <div className='flex flex-col'>
                                <div className='flex items-center gap-2'>
                                    <h3 className='text-xl font-semibold'>{bank.name}</h3>
                                    <FaEye
                                        onClick={() => setSelectedBank(bank._id)}
                                        className='text-gray-700 cursor-pointer inline-block text-xl'
                                    />
                                </div>
                                <p>Balance: {bank.balance.toFixed(2)} €</p>
                                <div className='flex justify-between items-center'>
                                    <FaPencil
                                        onClick={() => handleEditBank(bank)}
                                        className='text-gray-700 cursor-pointer inline-block'
                                    />
                                    <button
                                        onClick={() => handleDeleteBank(bank._id)}
                                        className='bg-red-500 text-light-coffee-cream p-2 rounded ml-4'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.article>
                ))}
            </section>

            <AnimatePresence>
                {selectedBank && (
                    <>
                        <motion.div
                            key='modal-overlay'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className='fixed inset-0 bg-black opacity-50'
                            onClick={() => setSelectedBank(false)}
                        />
                        <motion.div
                            key='modal-content'
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className='fixed inset-0 flex items-center justify-center rounded shadow'
                        >
                            <Movements bankId={selectedBank} setSelectedBank={setSelectedBank} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default Banks
