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

export const getUserBankById = async (req: Request, res: Response) => {
    try {
        const bank = await Bank.findOne({ _id: req.params.id, user: req.user?._id })

        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' })
        }

        res.status(200).json({ message: 'Bank retrieved successfully', bank })
    } catch (error) {
        res.status(500).json({ message: 'Failed to get bank', error: error.message })
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

export const updateBank = async (req: Request, res: Response) => {
    try {
        const { name, balance } = req.body

        const bank = await Bank.findOneAndUpdate(
            { _id: req.params.id, user: req.user?._id },
            { name, balance },
            { new: true },
        )

        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' })
        }

        res.status(200).json({ message: 'Bank updated successfully', bank })
    } catch (error) {
        res.status(500).json({ message: 'Failed to update bank', error: error.message })
    }
}

export const deleteBank = async (req: Request, res: Response) => {
    try {
        const bank = await Bank.findOneAndDelete({ _id: req.params.id, user: req.user?._id })

        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' })
        }

        res.status(200).json({ message: 'Bank deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete bank', error: error.message })
    }
}

// *** MOVEMENTS ***/

export const getBankMovements = async (req: Request, res: Response) => {
    try {
        const bank = await Bank.findOne({ _id: req.params.bankId, user: req.user?._id }).populate('movements')

        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' })
        }

        res.status(200).json({ message: 'Movements retrieved successfully', movements: bank.movements })
    } catch (error) {
        res.status(500).json({ message: 'Failed to get movements', error: error.message })
    }
}

export const addBankMovement = async (req: Request, res: Response) => {
    try {
        const { description, date, operation, money, quantity, type } = req.body

        const bank = await Bank.findOne({ _id: req.params.bankId, user: req.user?._id })

        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' })
        }

        const newMovement = {
            description,
            date,
            operation,
            money,
            quantity,
            type,
        }

        bank.movements.push(newMovement)

        // Calculate the impact and update the balance
        const impact = money * quantity * (operation ? 1 : -1)
        if (!bank.balance) {
            bank.balance = 0
        }
        bank.balance += impact

        await bank.save()

        res.status(201).json({ message: 'Movement added successfully', movement: newMovement })
    } catch (error) {
        res.status(500).json({ message: 'Failed to add movement', error: error.message })
    }
}

export const updateBankMovement = async (req: Request, res: Response) => {
    try {
        const { movementId } = req.params
        const { description, date, operation, money, quantity, type } = req.body

        const bank = await Bank.findOne({ _id: req.params.bankId, user: req.user?._id })

        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' })
        }

        const movement = bank.movements.id(movementId)
        if (!movement) {
            return res.status(404).json({ message: 'Movement not found' })
        }

        // Calculate the impact of the old movement and reverse it
        const oldImpact = movement.money * movement.quantity * (movement.operation ? 1 : -1)
        bank.balance -= oldImpact

        // Update the movement
        movement.description = description || movement.description
        movement.date = date || movement.date
        movement.operation = operation !== undefined ? operation : movement.operation
        movement.money = money !== undefined ? money : movement.money
        movement.quantity = quantity !== undefined ? quantity : movement.quantity
        movement.type = type || movement.type

        // Calculate the impact of the updated movement and apply it
        const newImpact = movement.money * movement.quantity * (movement.operation ? 1 : -1)
        bank.balance += newImpact

        await bank.save()

        res.status(200).json({ message: 'Movement updated successfully', movement })
    } catch (error) {
        res.status(500).json({ message: 'Failed to update movement', error: error.message })
    }
}

export const deleteBankMovement = async (req: Request, res: Response) => {
    try {
        const { bankId, movementId } = req.params

        const bank = await Bank.findOne({ _id: bankId, user: req.user?._id })

        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' })
        }

        const movement = bank.movements.id(movementId)
        if (!movement) {
            return res.status(404).json({ message: 'Movement not found' })
        }

        // Calculate the impact and update the balance before removal
        const impact = movement.money * movement.quantity * (movement.operation ? 1 : -1)
        bank.balance -= impact

        // Remove the movement
        bank.movements.pull(movementId)
        await bank.save()

        res.status(200).json({ message: 'Movement deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete movement', error: error.message })
    }
}
