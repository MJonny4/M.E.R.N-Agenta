import { body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const validateMovement = [
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isString()
        .withMessage('Description must be a string')
        .isLength({ max: 255 })
        .withMessage('Description must be at most 255 characters'),

    body('date')
        .optional()
        .custom((value, { req }) => {
            if (!value) {
                const today = new Date()
                const year = today.getFullYear()
                const month = String(today.getMonth() + 1).padStart(2, '0') // Months are 0-based
                const day = String(today.getDate()).padStart(2, '0')
                req.body.date = `${year}-${month}-${day}`
            }
            return true
        })
        .isISO8601()
        .toDate()
        .withMessage('Date must be a valid ISO 8601 date'),

    body('operation')
        .notEmpty()
        .withMessage('Operation is required')
        .isBoolean()
        .withMessage('Operation must be a boolean'),

    body('money').notEmpty().withMessage('Money is required').isDecimal().withMessage('Money must be a decimal value'),

    body('quantity').optional().isInt({ gt: 0 }).withMessage('Quantity must be an integer greater than 0'),

    body('type')
        .notEmpty()
        .withMessage('Type is required')
        .isIn(['rent', 'salary', 'food', 'clothes', 'other'])
        .withMessage('Type must be one of the following: rent, salary, food, clothes, other'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    },
]
