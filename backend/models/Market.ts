import { Document, Schema, Types, model } from 'mongoose'

interface IMarket extends Document {
    name: string
    user: Types.ObjectId
    shops: Types.ObjectId[]
}

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
        shops: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Shop',
            },
        ],
    },
    {
        timestamps: true,
        versionKey: true,
    }
)

const Market = model<IMarket>('Market', marketSchema)

export default Market
