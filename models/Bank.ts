import { Document, Model, Schema, Types, model } from 'mongoose'

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

interface IBankModel extends Model<IBank> {
    filterMovements(filters: any, bankId: Types.ObjectId, userId: Types.ObjectId): Promise<IMovement[]>
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

bankSchema.statics.filterMovements = async function (
    filters: any,
    bankId: Types.ObjectId,
    userId: Types.ObjectId,
): Promise<IMovement[]> {
    const bank = await this.findOne({ _id: bankId, user: userId }).populate('movements')

    if (!bank) {
        throw new Error('Bank not found')
    }

    return bank.movements.filter((movement: IMovement) => {
        for (const key in filters) {
            const filterValue = filters[key]
            const movementValue = movement[key]

            if (key === 'date' || key === 'money' || key === 'quantity') {
                if (filterValue.$gte && movementValue < filterValue.$gte) return false
                if (filterValue.$lte && movementValue > filterValue.$lte) return false
            } else if (key === 'description') {
                if (!filterValue.$regex.test(movementValue || '')) return false
            } else {
                if (movementValue !== filterValue) return false
            }
        }
        return true
    })
}

const Bank = model<IBank, IBankModel>('Bank', bankSchema)

export default Bank
