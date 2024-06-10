import { Request, Response } from 'express'
import { Types } from 'mongoose'
import Market from '../models/Market' // Adjust the import according to your actual model file

const { ObjectId } = Types

export const getUserMarkets = async (req: Request, res: Response) => {
    try {
        const markets = await Market.find({ user: req.user?._id })

        res.status(200).json({ message: 'Markets retrieved successfully', markets })
    } catch (error) {
        res.status(500).json({ message: 'Failed to get markets', error: error.message })
    }
}

export const getUserMarketById = async (req: Request, res: Response) => {
    try {
        const market = await Market.findOne({ _id: req.params.id, user: req.user?._id })

        if (!market) {
            return res.status(404).json({ message: 'Market not found' })
        }

        res.status(200).json({ message: 'Market retrieved successfully', market })
    } catch (error) {
        res.status(500).json({ message: 'Failed to get market', error: error.message })
    }
}

export const createMarket = async (req: Request, res: Response) => {
    try {
        const { name } = req.body

        const market = await Market.create({
            name,
            user: req.user?._id,
        })

        res.status(201).json({ message: 'Market created successfully', market })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create market', error: error.message })
    }
}

export const updateMarket = async (req: Request, res: Response) => {
    try {
        const { name } = req.body

        const market = await Market.findOneAndUpdate(
            { _id: req.params.id, user: req.user?._id },
            { name },
            { new: true },
        )

        if (!market) {
            return res.status(404).json({ message: 'Market not found' })
        }

        res.status(200).json({ message: 'Market updated successfully', market })
    } catch (error) {
        res.status(500).json({ message: 'Failed to update market', error: error.message })
    }
}

export const deleteMarket = async (req: Request, res: Response) => {
    try {
        const market = await Market.findOneAndDelete({ _id: req.params.id, user: req.user?._id })

        if (!market) {
            return res.status(404).json({ message: 'Market not found' })
        }

        res.status(200).json({ message: 'Market deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete market', error: error.message })
    }
}

// *** SHOPS ***

export const getMarketShops = async (req: Request, res: Response) => {
    const { product, startDate, endDate, minQuantity, maxQuantity, minPrice, maxPrice } = req.query

    try {
        const marketId = new ObjectId(req.params.marketId)
        const userId = new ObjectId(req.user?._id)
        const filters: any = {}

        if (product) filters.product = { $regex: new RegExp(product as string, 'i') }
        if (startDate || endDate) {
            filters.date = {}
            if (startDate) filters.date.$gte = new Date(startDate as string)
            if (endDate) filters.date.$lte = new Date(endDate as string)
        }
        if (minQuantity) filters.quantity = { ...filters.quantity, $gte: Number(minQuantity) }
        if (maxQuantity) filters.quantity = { ...filters.quantity, $lte: Number(maxQuantity) }
        if (minPrice) filters.price = { ...filters.price, $gte: Number(minPrice) }
        if (maxPrice) filters.price = { ...filters.price, $lte: Number(maxPrice) }

        const market = await Market.findOne({ _id: marketId, user: userId }).populate('shops')
        if (!market) {
            return res.status(404).json({ message: 'Market not found' })
        }

        const filteredShops = market.shops.filter((shop: any) => {
            return Object.keys(filters).every((key) => {
                if (key === 'product') {
                    return new RegExp(filters[key].$regex).test(shop[key])
                }
                if (typeof filters[key] === 'object') {
                    if (filters[key].$gte && shop[key] < filters[key].$gte) return false
                    if (filters[key].$lte && shop[key] > filters[key].$lte) return false
                }
                return shop[key] === filters[key]
            })
        })

        res.status(200).json({ message: 'Shops retrieved successfully', shops: filteredShops })
    } catch (error) {
        res.status(500).json({ message: 'Failed to get shops', error: error.message })
    }
}

export const addMarketShop = async (req: Request, res: Response) => {
    try {
        const { product, quantity, price, date } = req.body

        const market = await Market.findOne({ _id: req.params.marketId, user: req.user?._id })

        if (!market) {
            return res.status(404).json({ message: 'Market not found' })
        }

        const newShop = {
            product,
            quantity,
            price,
            date,
            user: req.user?._id,
        }

        market.shops.push(newShop)

        await market.save()

        res.status(201).json({ message: 'Shop added successfully', shop: newShop })
    } catch (error) {
        res.status(500).json({ message: 'Failed to add shop', error: error.message })
    }
}

export const updateMarketShop = async (req: Request, res: Response) => {
    try {
        const { shopId } = req.params
        const { product, quantity, price, date } = req.body

        const market = await Market.findOne({ _id: req.params.marketId, user: req.user?._id })

        if (!market) {
            return res.status(404).json({ message: 'Market not found' })
        }

        const shop = market.shops.id(shopId)
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' })
        }

        // Update the shop
        shop.product = product || shop.product
        shop.quantity = quantity !== undefined ? quantity : shop.quantity
        shop.price = price !== undefined ? price : shop.price
        shop.date = date || shop.date

        await market.save()

        res.status(200).json({ message: 'Shop updated successfully', shop })
    } catch (error) {
        res.status(500).json({ message: 'Failed to update shop', error: error.message })
    }
}

export const deleteMarketShop = async (req: Request, res: Response) => {
    try {
        const { marketId, shopId } = req.params

        const market = await Market.findOne({ _id: marketId, user: req.user?._id })

        if (!market) {
            return res.status(404).json({ message: 'Market not found' })
        }

        const shop = market.shops.id(shopId)
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' })
        }

        // Remove the shop
        market.shops.pull(shopId)
        await market.save()

        res.status(200).json({ message: 'Shop deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete shop', error: error.message })
    }
}
