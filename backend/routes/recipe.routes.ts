import express from 'express'
import * as recipeController from '../controllers/recipe.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import {
    validateRecipe,
    validateIngredient,
    validateStep,
    validateRecipeId,
    validateStepId,
    validateIngredientId,
} from '../validators/recipe.validator'
import { validationMiddleware } from '../middlewares/validation.middleware'

const router = express.Router()

// Recipe routes
router.get('/', authMiddleware, recipeController.getAllRecipes)
router.get('/:id', authMiddleware, validateRecipeId, validationMiddleware, recipeController.getRecipeById)

router.post('/', authMiddleware, validateRecipe, validationMiddleware, recipeController.createRecipe)
router.patch('/:id', authMiddleware, validateRecipeId, validationMiddleware, recipeController.updateRecipe)
router.delete('/:id', authMiddleware, validateRecipeId, validationMiddleware, recipeController.deleteRecipe)

// Ingredient routes
router.get(
    '/:id/ingredients',
    authMiddleware,
    validateRecipeId,
    validationMiddleware,
    recipeController.getRecipeIngredients,
)
router.post(
    '/:id/ingredients',
    authMiddleware,
    validateRecipeId,
    validateIngredient,
    validationMiddleware,
    recipeController.addIngredient,
)
router.patch(
    '/:id/ingredients/:ingredientId',
    authMiddleware,
    validateRecipeId,
    validateIngredientId,
    validationMiddleware,
    recipeController.updateIngredient,
)
router.delete(
    '/:id/ingredients/:ingredientId',
    authMiddleware,
    validateRecipeId,
    validateIngredientId,
    validationMiddleware,
    recipeController.deleteIngredient,
)

// Step routes
router.get('/:id/steps', authMiddleware, validateRecipeId, validationMiddleware, recipeController.getRecipeSteps)
router.post(
    '/:id/steps',
    authMiddleware,
    validateRecipeId,
    validateStep,
    validationMiddleware,
    recipeController.addStep,
)
router.patch(
    '/:id/steps/:stepId',
    authMiddleware,
    validateRecipeId,
    validateStepId,
    validationMiddleware,
    recipeController.updateStep,
)
router.delete(
    '/:id/steps/:stepId',
    authMiddleware,
    validateRecipeId,
    validateStepId,
    validationMiddleware,
    recipeController.deleteStep,
)

export default router
