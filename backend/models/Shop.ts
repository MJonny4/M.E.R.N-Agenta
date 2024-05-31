import { Document, Schema, Types, model } from 'mongoose'

interface IShop extends Document {
    marketId: Types.ObjectId
    product: string
    quantity: number
    price?: bigint | null
    date: Date
    user: Types.ObjectId
}

const shopSchema = new Schema<IShop>(
    {
        marketId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Market',
        },
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
    }
)

const Shop = model<IShop>('Shop', shopSchema)

export default Shop
