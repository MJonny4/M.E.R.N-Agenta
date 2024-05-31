import { Request, Response } from 'express'
import Bank from '../models/Bank'

export const getUserBanks = async (req: Request, res: Response) => {
    try {
        const banks = await Bank.find({ user: req.user?._id })

        res.status(200).json({ message: 'Banks retrieved successfully', banks })
    } catch (error) {
        res.status(500).json({ message: 'Failed to get banks', error: error.message })
    }
}

export const createBank = async (req: Request, res: Response) => {
    try {
        const { name, balance } = req.body

        const bank = await Bank.create({
            name,
            balance,
            user: req.user?._id,
        })

        res.status(201).json({ message: 'Bank created successfully', bank })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create bank', error: error.message })
    }
}
