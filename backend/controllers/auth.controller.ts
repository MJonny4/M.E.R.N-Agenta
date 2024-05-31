import { Request, Response } from 'express'
import User from '../models/User'
import { generateToken } from '../utils/auth'

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ message: 'Email has already been taken!' })
        }

        const user = await User.create({
            username,
            email,
            password,
        })

        if (!user) {
            return res.status(400).json({ message: 'Error creating user' })
        }

        res.status(201).json({ message: 'You have been registered successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user', error: error.message })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const token = generateToken(user._id as string, user.username, user.email)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // Use 'none' if needed for cross-site requests
            maxAge: 1800000, // 30 minutes
        })
            .status(200)
            .json({
                message: 'Logged in successfully',
                token,
            })
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message })
    }
}

export const logoutUser = async (req: Request, res: Response) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({ message: 'You are not logged in' })
    }
}
