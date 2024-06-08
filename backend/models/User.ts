import { hash, compare } from 'bcrypt'
import { Document, Schema, model } from 'mongoose'

interface IUser extends Document {
    username: string
    email: string
    password: string
    comparePassword: (candidatePassword: string) => Promise<boolean>
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await hash(this.password, 8)
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return compare(candidatePassword, this.password)
}

const User = model<IUser>('User', userSchema)

export default User
