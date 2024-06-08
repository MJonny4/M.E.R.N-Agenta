import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validateMarket, validateShop } from '../validators/market.validator'

import {
    createMarket,
    getUserMarketById,
    getUserMarkets,
    updateMarket,
    addMarketShop,
    getMarketShops,
    updateMarketShop,
    deleteMarketShop,
    deleteMarket,
} from '../controllers/market.controller'

const router = Router()

// Market routes
router.get('/', authMiddleware, getUserMarkets) // ✅
router.get('/:id', authMiddleware, getUserMarketById) // ✅

router.post('/', authMiddleware, validateMarket, createMarket) // ✅
router.patch('/:id', authMiddleware, validateMarket, updateMarket) // ✅
router.delete('/:id', authMiddleware, deleteMarket) // ✅

// Shop routes
router.get('/:marketId/shops', authMiddleware, getMarketShops)
router.post('/:marketId/shops', authMiddleware, validateShop, addMarketShop) // ✅
router.patch('/:marketId/shops/:shopId', authMiddleware, updateMarketShop)
router.delete('/:marketId/shops/:shopId', authMiddleware, deleteMarketShop)

export default router
