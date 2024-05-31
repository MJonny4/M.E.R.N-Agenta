import { body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const validateBank = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 1 })
        .withMessage('Name is required')
        .trim()
        .escape(),
    body('balance')
        .optional()
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('Balance must be a decimal number with up to 2 decimal places')
        .custom((value) => value >= 0)
        .withMessage('Balance must be a non-negative number'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    },
]
