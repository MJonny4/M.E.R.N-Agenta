import { body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

// Validator for the shop schema
export const validateShop = [
    body('product')
        .isString()
        .withMessage('Product must be a string')
        .isLength({ max: 255 })
        .withMessage('Product must be at most 255 characters long')
        .trim()
        .escape(),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer').toInt(),
    body('price')
        .optional()
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('Price must be a valid decimal value with up to 2 decimal places'),
    body('date').isISO8601().withMessage('Date must be a valid ISO 8601 date').toDate(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    },
]

// Validator for the market schema
export const validateMarket = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ max: 255 })
        .withMessage('Name must be at most 255 characters long')
        .trim()
        .escape(),
    body('user')
        .optional()
        .custom((value) => value.match(/^[0-9a-fA-F]{24}$/))
        .withMessage('User must be a valid ObjectId'),
    body('shops')
        .optional()
        .isArray()
        .withMessage('Shops must be an array')
        .custom((shops: any[]) => {
            if (!Array.isArray(shops)) return false
            return shops.every((shop) => {
                const errors = validationResult(shop)
                return errors.isEmpty()
            })
        })
        .withMessage('Shops array contains invalid objects'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    },
]
