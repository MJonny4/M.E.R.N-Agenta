import mongoose, { Document, Schema } from 'mongoose'

export interface IStreak extends Document {
    name: string
    count: number
    user: mongoose.Types.ObjectId
    lastCheckedDate: Date
}

const StreakSchema = new Schema<IStreak>(
    {
        name: { type: String, required: true },
        count: { type: Number, default: 0 },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        lastCheckedDate: { type: Date, default: null },
    },
    { timestamps: true },
)

export default mongoose.model<IStreak>('Streak', StreakSchema)
