import mongoose, { Document, Schema } from 'mongoose'

export interface IStreakHelper extends Document {
    streak: mongoose.Types.ObjectId
    dateChecked: Date
    checked: boolean
}

const StreakHelperSchema = new Schema<IStreakHelper>(
    {
        streak: { type: Schema.Types.ObjectId, ref: 'Streak', required: true },
        dateChecked: { type: Date, required: true },
        checked: { type: Boolean, default: false },
    },
    { timestamps: true },
)

StreakHelperSchema.index({ streak: 1, dateChecked: 1 }, { unique: true })

export default mongoose.model<IStreakHelper>('StreakHelper', StreakHelperSchema)
