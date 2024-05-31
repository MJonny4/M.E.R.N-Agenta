import { Document, Schema, Types, model } from 'mongoose'

interface IBank extends Document {
    name: string
    balance: bigint | null
    user: Types.ObjectId
    movements: Types.ObjectId[]
}

const bankSchema = new Schema<IBank>(
    {
        name: {
            type: String,
            required: true,
            maxlength: 255,
        },
        balance: {
            type: Schema.Types.Decimal128,
            default: null,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        movements: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Movement',
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    },
)

const Bank = model<IBank>('Bank', bankSchema)

export default Bank
