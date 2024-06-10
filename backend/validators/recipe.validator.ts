import { body, param } from 'express-validator'

export const validateRecipe = [
    body('name').isString().notEmpty().withMessage('Recipe name is required'),
    body('calories').isInt({ min: 0 }).withMessage('Calories must be a non-negative integer'),
    body('ingredients').isArray().optional().withMessage('Ingredients must be an array'),
    body('ingredients.*.name').isString().notEmpty().optional().withMessage('Ingredient name is required'),
    body('ingredients.*.calories')
        .isInt({ min: 0 })
        .optional()
        .withMessage('Ingredient calories must be a non-negative integer'),
    body('ingredients.*.quantity').isNumeric().optional().withMessage('Ingredient quantity must be a number'),
    body('ingredients.*.price').isNumeric().optional().withMessage('Ingredient price must be a number'),
    body('steps').isArray().optional().withMessage('Steps must be an array'),
    body('steps.*.description').isString().notEmpty().optional().withMessage('Step description is required'),
    body('steps.*.order').isInt({ min: 1 }).optional().withMessage('Step order must be a positive integer'),
]

export const validateIngredient = [
    body('name').isString().notEmpty().optional().withMessage('Ingredient name is required'),
    body('calories').isInt({ min: 0 }).optional().withMessage('Calories must be a non-negative integer'),
    body('quantity').isNumeric().optional().withMessage('Quantity must be a number'),
    body('price').isNumeric().optional().withMessage('Price must be a number'),
]

export const validateStep = [
    body('description').isString().notEmpty().optional().withMessage('Step description is required'),
    body('order').isInt({ min: 1 }).optional().withMessage('Step order must be a positive integer'),
]

export const validateRecipeId = [param('id').isMongoId().optional().withMessage('Invalid recipe ID')]

export const validateStepId = [param('stepId').isMongoId().optional().withMessage('Invalid step ID')]

export const validateIngredientId = [param('ingredientId').isMongoId().optional().withMessage('Invalid ingredient ID')]
