import { useState } from 'react'

const CreateBankForm = ({ onCreateBank }: { onCreateBank: (newBank: { name: string; balance: number }) => void }) => {
    const [newBank, setNewBank] = useState({ name: '', balance: 0 })

    const handleCreateBank = () => {
        onCreateBank(newBank)
        setNewBank({ name: '', balance: 0 })
    }

    return (
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
    )
}

export default CreateBankForm
