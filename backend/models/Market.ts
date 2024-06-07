import { Document, Schema, Types, model } from 'mongoose'

interface IShop extends Document {
    product: string
    quantity: number
    price?: bigint | null
    date: Date
    user: Types.ObjectId
}

interface IMarket extends Document {
    name: string
    user: Types.ObjectId
    shops: IShop[]
}

const shopSchema = new Schema<IShop>(
    {
        product: {
            type: String,
            required: true,
            maxlength: 255,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Schema.Types.Decimal128,
            default: null,
        },
        date: {
            type: Date,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
)

const marketSchema = new Schema<IMarket>(
    {
        name: {
            type: String,
            required: true,
            maxlength: 255,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        shops: [shopSchema], // Embed Shop schema
    },
    {
        timestamps: true,
        versionKey: true,
    },
)

const Market = model<IMarket>('Market', marketSchema)

export default Market
