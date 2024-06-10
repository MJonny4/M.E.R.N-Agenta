import express from 'express'
import * as streakController from '../controllers/streak.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validateRecipeId } from '../validators/recipe.validator'
import { validationMiddleware } from '../middlewares/validation.middleware'

const router = express.Router()

router.get('/', authMiddleware, streakController.getUserStreaks)
router.post('/', authMiddleware, streakController.createStreak)
router.post('/:id/check-in', authMiddleware, validateRecipeId, validationMiddleware, streakController.checkInStreak)
router.get('/:id/history', authMiddleware, validateRecipeId, validationMiddleware, streakController.getStreakHistory)

export default router
