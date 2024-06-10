import { useEffect, useState } from 'react'
import { TMovement, TMovementType } from '../../types/types'

interface formProps {
    description: string
    money: any
    type: TMovementType
    operation: boolean
    date: string
    quantity: number
}

const MovementForm: React.FC<{ onSubmit: (data: Partial<TMovement>) => void; initialData?: Partial<TMovement> }> = ({
    onSubmit,
    initialData,
}) => {
    const [form, setForm] = useState<formProps>({
        description: '',
        money: '',
        type: 'other' as TMovementType,
        operation: true,
        date: new Date().toISOString().split('T')[0], // Today's date
        quantity: 1,
    })

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
                money: initialData.money || '',
                date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : form.date,
            } as unknown as typeof form)
        }
    }, [initialData])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ ...form, money: parseFloat(form.money), date: new Date(form.date) })
        setForm({
            description: '',
            money: '',
            type: 'other',
            operation: true,
            date: new Date().toISOString().split('T')[0],
            quantity: 1,
        })
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label htmlFor='description' className='block text-sm font-medium text-mocha-brown'>
                    Description
                </label>
                <input
                    type='text'
                    id='description'
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-chocolate focus:ring focus:ring-rich-chocolate/50'
                />
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label htmlFor='money' className='block text-sm font-medium text-mocha-brown'>
                        money
                    </label>
                    <input
                        type='number'
                        id='money'
                        value={form.money}
                        onChange={(e) => setForm({ ...form, money: parseFloat(e.target.value) })}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-chocolate focus:ring focus:ring-rich-chocolate/50'
                    />
                </div>
                <div>
                    <label htmlFor='quantity' className='block text-sm font-medium text-mocha-brown'>
                        Quantity
                    </label>
                    <input
                        type='number'
                        id='quantity'
                        value={form.quantity}
                        onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value, 10) })}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-chocolate focus:ring focus:ring-rich-chocolate/50'
                    />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label htmlFor='date' className='block text-sm font-medium text-mocha-brown'>
                        Date
                    </label>
                    <input
                        type='date'
                        id='date'
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-chocolate focus:ring focus:ring-rich-chocolate/50'
                    />
                </div>
                <div>
                    <label htmlFor='type' className='block text-sm font-medium text-mocha-brown'>
                        Type
                    </label>
                    <select
                        id='type'
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value as TMovementType })}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-chocolate focus:ring focus:ring-rich-chocolate/50'
                    >
                        <option value='rent'>Rent</option>
                        <option value='salary'>Salary</option>
                        <option value='food'>Food</option>
                        <option value='clothes'>Clothes</option>
                        <option value='other'>Other</option>
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor='operation' className='block text-sm font-medium text-mocha-brown'>
                    Operation
                </label>
                <select
                    id='operation'
                    value={form.operation.toString()}
                    onChange={(e) => setForm({ ...form, operation: e.target.value === 'true' })}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-chocolate focus:ring focus:ring-rich-chocolate/50'
                >
                    <option value='true'>Income</option>
                    <option value='false'>Expense</option>
                </select>
            </div>
            <button
                type='submit'
                className='w-full py-2 px-4 bg-rich-chocolate text-light-coffee-cream rounded-md hover:bg-mocha-brown transition-colors'
            >
                {initialData ? 'Update Movement' : 'Add Movement'}
            </button>
        </form>
    )
}

export default MovementForm
