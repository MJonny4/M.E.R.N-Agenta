import ExcelJS from 'exceljs'
import { Request, Response } from 'express'
import { Types } from 'mongoose'
import Bank from '../models/Bank'
import { MovementType } from './../models/Bank'

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
    const { description, startDate, endDate, operation, minMoney, maxMoney, minQuantity, maxQuantity, type } = req.query

    try {
        const bankId = new Types.ObjectId(req.params.bankId)
        const userId = new Types.ObjectId(req.user?._id)
        const filters: any = {}

        if (description) filters.description = { $regex: new RegExp(description as string, 'i') }
        if (startDate || endDate) {
            filters.date = {}
            if (startDate) filters.date.$gte = new Date(startDate as string)
            if (endDate) filters.date.$lte = new Date(endDate as string)
        }
        if (operation !== undefined) filters.operation = operation === 'true'
        if (minMoney) filters.money = { ...filters.money, $gte: Number(minMoney) }
        if (maxMoney) filters.money = { ...filters.money, $lte: Number(maxMoney) }
        if (minQuantity) filters.quantity = { ...filters.quantity, $gte: Number(minQuantity) }
        if (maxQuantity) filters.quantity = { ...filters.quantity, $lte: Number(maxQuantity) }
        if (type) filters.type = type as MovementType

        const movements = await Bank.filterMovements(filters, bankId, userId)

        res.status(200).json({ message: 'Movements retrieved successfully', movements })
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

export const exportBankMovementsToExcel = async (req: Request, res: Response) => {
    const { description, startDate, endDate, operation, minMoney, maxMoney, minQuantity, maxQuantity, type } = req.query

    try {
        // Validate and convert bankId and userId to ObjectId
        const bankId = new Types.ObjectId(req.params.bankId)
        const userId = new Types.ObjectId(req.user?._id)

        const filters: any = {}

        if (description) filters.description = { $regex: new RegExp(description as string, 'i') }
        if (startDate || endDate) {
            filters.date = {}
            if (startDate) filters.date.$gte = new Date(startDate as string)
            if (endDate) filters.date.$lte = new Date(endDate as string)
        }
        if (operation !== undefined) filters.operation = operation === 'true'
        if (minMoney) filters.money = { ...filters.money, $gte: Number(minMoney) }
        if (maxMoney) filters.money = { ...filters.money, $lte: Number(maxMoney) }
        if (minQuantity) filters.quantity = { ...filters.quantity, $gte: Number(minQuantity) }
        if (maxQuantity) filters.quantity = { ...filters.quantity, $lte: Number(maxQuantity) }
        if (type) filters.type = type as MovementType

        const movements = await Bank.filterMovements(filters, bankId, userId)

        // Create a new workbook and add a worksheet
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Movements')

        // Define columns
        worksheet.columns = [
            { header: 'Description', key: 'description', width: 30 },
            { header: 'Date', key: 'date', width: 15 },
            { header: 'Operation', key: 'operation', width: 10 },
            { header: 'Money', key: 'money', width: 15 },
            { header: 'Quantity', key: 'quantity', width: 10 },
            { header: 'Type', key: 'type', width: 15 },
        ]

        // Add rows
        movements.forEach((movement) => {
            worksheet.addRow({
                description: movement.description,
                date: movement.date,
                operation: movement.operation ? 'Credit' : 'Debit',
                money: movement.money,
                quantity: movement.quantity,
                type: movement.type,
            })
        })

        // Set the response headers and send the buffer as a downloadable file
        res.setHeader('Content-Disposition', 'attachment; filename="movements.xlsx"')
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

        await workbook.xlsx.write(res)
        res.end()
    } catch (error) {
        res.status(500).json({ message: 'Failed to export movements to Excel', error: error.message })
    }
}
