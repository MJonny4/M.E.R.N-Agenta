import { Document, Schema, Types, model } from 'mongoose'
import Bank from './Bank' // Assuming Bank model is in the same directory

export type MovementType = 'rent' | 'salary' | 'food' | 'clothes' | 'other'

interface IMovement extends Document {
    description?: string
    date?: Date
    operation?: boolean // true = +, false = -
    money?: bigint
    quantity?: number
    type?: MovementType
    bankId?: Types.ObjectId
    bank: Types.ObjectId
}

const movementSchema = new Schema<IMovement>(
    {
        description: {
            type: String,
            default: null,
        },
        date: {
            type: Date,
            default: null,
        },
        operation: {
            type: Boolean,
            default: false,
        },
        money: {
            type: Schema.Types.Decimal128,
            default: null,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        type: {
            type: String,
            enum: ['rent', 'salary', 'food', 'clothes', 'other'],
            default: null,
        },
        bankId: {
            type: Schema.Types.ObjectId,
            ref: 'Bank',
            default: null,
        },
    },
    {
        timestamps: true,
    },
)

movementSchema.pre<IMovement>('save', async function (next) {
    if (!this.isModified('money') && !this.isModified('quantity') && !this.isModified('operation')) {
        return next()
    }

    try {
        const bank = await Bank.findById(this.bankId)
        if (!bank) {
            throw new Error('Bank not found')
        }

        // Calculate the impact
        const impact = (this.money as unknown as number) * this.quantity * (this.operation ? 1 : -1)
        ;(bank.balance as unknown as number) += impact

        // Save the updated bank
        await bank.save()
        next()
    } catch (error) {
        next(error)
    }
})

movementSchema.pre<IMovement>('deleteOne', async function (next) {
    try {
        const bank = await Bank.findById(this.bankId)
        if (!bank) {
            throw new Error('Bank not found')
        }

        // Calculate the impact
        const impact = (this.money as unknown as number) * this.quantity * (this.operation ? 1 : -1)
        ;(bank.balance as unknown as number) -= impact

        // Save the updated bank
        await bank.save()
        next()
    } catch (error) {
        next(error)
    }
})

const Movement = model<IMovement>('Movement', movementSchema)

export default Movement
