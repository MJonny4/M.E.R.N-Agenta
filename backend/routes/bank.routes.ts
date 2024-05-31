import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { getUserBanks, createBank } from '../controllers/bank.controller'
import { validateBank } from '../validators/bank.validators'

const router = Router()

router.get('/', authMiddleware, getUserBanks)
router.post('/create', authMiddleware, validateBank, createBank)

export default router
