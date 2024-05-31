import jwt from 'jsonwebtoken'
import Logging from './logger'

export const generateToken = (_id: string, username: string, email: string) => {
    return jwt.sign({ _id, username, email }, process.env.JWT_SECRET, {
        expiresIn: '30m',
    })
}
