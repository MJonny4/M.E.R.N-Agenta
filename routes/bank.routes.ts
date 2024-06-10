import { Router } from 'express'
import {
    createBank,
    deleteBank,
    getUserBankById,
    getUserBanks,
    updateBank,
    getBankMovements,
    addBankMovement,
    updateBankMovement,
    deleteBankMovement,
} from '../controllers/bank.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validateBank } from '../validators/bank.validators'
import { validateMovement } from '../validators/movement.validator'

const router = Router()

// Bank routes
router.get('/', authMiddleware, getUserBanks)
router.get('/:id', authMiddleware, getUserBankById)

router.post('/', authMiddleware, validateBank, createBank)
router.patch('/:id', authMiddleware, validateBank, updateBank)
router.delete('/:id', authMiddleware, deleteBank)

// Movement routes
router.get('/:bankId/movements', authMiddleware, getBankMovements)
router.post('/:bankId/movements', authMiddleware, validateMovement, addBankMovement)
router.patch('/:bankId/movements/:movementId', authMiddleware, updateBankMovement)
router.delete('/:bankId/movements/:movementId', authMiddleware, deleteBankMovement)

export default router
