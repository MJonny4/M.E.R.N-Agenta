import ExcelJS from 'exceljs'
import { Request, Response } from 'express'
import { Between } from 'typeorm'
import AppDataSource from '../database/connection'
import Bank from '../models/Bank'
import Movement from '../models/Movement'

export const getAllMovements = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const movementRepository = AppDataSource.getRepository(Movement)
        const movements = await movementRepository.find({
            relations: ['bank'],
        })
        res.json(movements)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const createMovement = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const movementRepository = AppDataSource.getRepository(Movement)
        const movement = movementRepository.create(req.body)
        await movementRepository.save(movement)
        res.status(201).json(movement)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const updateMovement = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params
        const movementRepository = AppDataSource.getRepository(Movement)
        const movement = await movementRepository.findOneBy({ id })
        if (!movement) {
            res.status(404).json({ message: 'Movement not found' })
            return
        }
        movementRepository.merge(movement, req.body)
        await movementRepository.save(movement)
        res.json(movement)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const deleteMovement = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params
        const movementRepository = AppDataSource.getRepository(Movement)
        const movement = await movementRepository.findOneBy({ id })
        if (!movement) {
            res.status(404).json({ message: 'Movement not found' })
            return
        }
        await movementRepository.remove(movement)
        res.status(204).json()
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const downloadMovementsExcel = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { startDate, endDate, type, bankId } = req.query

        const whereClause: any = {}
        if (startDate && endDate) {
            whereClause.date = Between(
                new Date(startDate as string),
                new Date(endDate as string)
            )
        } else if (startDate) {
            whereClause.date = Between(
                new Date(startDate as string),
                new Date()
            )
        } else if (endDate) {
            whereClause.date = Between(
                new Date('1900-01-01'),
                new Date(endDate as string)
            )
        }
        if (type) whereClause.type = type
        if (bankId) whereClause.bank = { id: bankId }

        const movementRepository = AppDataSource.getRepository(Movement)
        const movements = await movementRepository.find({
            where: whereClause,
            relations: ['bank'],
        })

        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Movements')

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 36 },
            {
                header: 'Description',
                key: 'description',
                width: 30,
                border: { top: { style: 'thin' } },
            },
            { header: 'Date', key: 'date', width: 20 },
            { header: 'Operation', key: 'operation', width: 10 },
            { header: 'Money', key: 'money', width: 10 },
            { header: 'Quantity', key: 'quantity', width: 10 },
            { header: 'Type', key: 'type', width: 15 },
            { header: 'Bank', key: 'bankName', width: 20 },
            { header: 'Bank Balance', key: 'bankBalance', width: 15 },
        ]

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF4F81BD' },
            }
            cell.alignment = { vertical: 'middle', horizontal: 'center' }
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            }
        })

        movements.forEach((movement: Movement & { bank?: Bank }) => {
            worksheet.addRow({
                id: movement.id,
                description: movement.description,
                date: movement.date,
                operation: movement.operation ? 'Credit' : 'Debit',
                money: movement.money,
                quantity: movement.quantity,
                type: movement.type,
                bankName: movement.bank ? movement.bank.name : 'N/A',
                bankBalance: movement.bank ? movement.bank.balance : 'N/A',
            })
        })

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=movements.xlsx'
        )

        await workbook.xlsx.write(res)
        res.end()
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}
