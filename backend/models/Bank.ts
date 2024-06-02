import { Document, Schema, Types, model } from 'mongoose'

export type MovementType = 'rent' | 'salary' | 'food' | 'clothes' | 'other'

export interface IMovement extends Document {
    description?: string
    date?: Date
    operation: boolean // true = +, false = -
    money: number
    quantity: number
    type: MovementType
}

const movementSchema = new Schema<IMovement>(
    {
        description: {
            type: String,
            default: null,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        operation: {
            type: Boolean,
            required: true,
        },
        money: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        type: {
            type: String,
            enum: ['rent', 'salary', 'food', 'clothes', 'other'],
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

interface IBank extends Document {
    user: Types.ObjectId
    name: string
    balance: number | null
    movements: Types.DocumentArray<IMovement>
}

const bankSchema = new Schema<IBank>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
            maxlength: 255,
        },
        balance: {
            type: Number,
            default: 0,
        },
        movements: [movementSchema], // Embed Movement schema
    },
    {
        timestamps: true,
        versionKey: false,
    },
)

const Bank = model<IBank>('Bank', bankSchema)

export default Bank
