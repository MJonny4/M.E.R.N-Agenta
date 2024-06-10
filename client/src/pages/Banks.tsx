import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import BankItem from '../components/banks/BankItem'
import CreateBankForm from '../components/banks/CreateBankForm'
import { createBank, deleteBank, getBanks, updateBank } from '../services/BankService'
import { type TBank } from '../types/types'
import Movements from '../components/movements/Movements'

const Banks: React.FC = () => {
    const [banks, setBanks] = useState<TBank[]>([])
    const [selectedBank, setSelectedBank] = useState<string | false>(false)

    useEffect(() => {
        fetchBanks()
    }, [selectedBank])

    const fetchBanks = async () => {
        const fetchedBanks = await getBanks()
        setBanks(fetchedBanks)
    }

    const handleCreateBank = async (newBank: { name: string; balance: number }) => {
        const createdBank = await createBank(newBank.name, newBank.balance)
        setBanks([...banks, createdBank])
    }

    const handleDeleteBank = async (id: string) => {
        await deleteBank(id)
        setBanks(banks.filter((bank) => bank._id !== id))
        if (selectedBank === id) setSelectedBank(false)
    }

    const handleEditBank = async (id: string, editedBank: { name: string; balance: number }) => {
        const updatedBank = await updateBank(id, editedBank.name, editedBank.balance)
        setBanks(banks.map((bank) => (bank._id === id ? updatedBank : bank)))
    }

    return (
        <>
            <h1 className='text-4xl font-bold mb-8'>Banks</h1>
            <CreateBankForm onCreateBank={handleCreateBank} />
            <h2 className='text-2xl font-bold mb-4 text-dark-espresso'>Your Banks</h2>
            <section className='grid grid-cols-3 gap-8'>
                {banks.map((bank) => (
                    <BankItem
                        key={bank._id}
                        bank={bank}
                        onDelete={handleDeleteBank}
                        onEdit={handleEditBank}
                        onSelect={setSelectedBank}
                    />
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
