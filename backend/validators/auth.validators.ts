import { body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const validateRegistration = [
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters long')
        .matches(/^[a-zA-Z0-9_.-]*$/)
        .withMessage('Username can only contain letters, numbers, dots, hyphens, and underscores'),
    body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must include a number')
        .matches(/[a-zA-Z]/)
        .withMessage('Password must include alphabetic characters')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must include a special character'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match')
        }
        return true
    }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() })
        }
        next()
    },
]

export const validateLogin = [
    body('email').isEmail().withMessage('Email must be valid').normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() })
        }
        next()
    },
]
