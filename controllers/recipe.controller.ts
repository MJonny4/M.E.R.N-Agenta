import { Request, Response } from 'express'
import Recipe, { IIngredient, IRecipe, IStep } from '../models/Recipe'

export const getAllRecipes = async (req: Request, res: Response) => {
    try {
        const recipes = await Recipe.find({ user: req.user?._id })
        res.status(200).json({ message: 'Recipes fetched successfully', recipes })
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipes', error: error.message })
    }
}

export const getRecipeById = async (req: Request, res: Response) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, user: req.user?._id })
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }
        res.status(200).json({ message: 'Recipe fetched successfully', recipe })
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipe', error: error.message })
    }
}

export const createRecipe = async (req: Request, res: Response) => {
    try {
        const { name, calories, ingredients, steps } = req.body
        const recipe: IRecipe = new Recipe({ name, calories, user: req.user?._id, ingredients, steps })
        await recipe.save()
        res.status(201).json({ message: 'Recipe created successfully', recipe })
    } catch (error) {
        res.status(400).json({ message: 'Failed to create recipe', error: error.message })
    }
}

export const updateRecipe = async (req: Request, res: Response) => {
    try {
        const updateFields: Partial<IRecipe> = {}

        // Dynamically build the update object
        if (req.body.name !== undefined) updateFields.name = req.body.name
        if (req.body.calories !== undefined) updateFields.calories = req.body.calories
        if (req.body.ingredients !== undefined) updateFields.ingredients = req.body.ingredients
        if (req.body.steps !== undefined) updateFields.steps = req.body.steps

        // Only proceed with the update if there are fields to update
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' })
        }

        const recipe = await Recipe.findOneAndUpdate(
            { _id: req.params.id, user: req.user?._id },
            { $set: updateFields },
            { new: true },
        )

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }

        res.status(200).json({ message: 'Recipe updated successfully', recipe })
    } catch (error) {
        res.status(400).json({ message: 'Failed to update recipe', error: error.message })
    }
}

export const deleteRecipe = async (req: Request, res: Response) => {
    try {
        const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, user: req.user?._id })
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }
        res.status(200).json({ message: 'Recipe deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete recipe', error: error.message })
    }
}

export const getRecipeIngredients = async (req: Request, res: Response) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, user: req.user?._id })
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }
        res.status(200).json({ message: 'Ingredients fetched successfully', ingredients: recipe.ingredients })
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch ingredients', error: error.message })
    }
}

export const addIngredient = async (req: Request, res: Response) => {
    try {
        const { name, calories, quantity, price } = req.body
        const recipe = await Recipe.findOneAndUpdate(
            { _id: req.params.id, user: req.user?._id },
            { $push: { ingredients: { name, calories, quantity, price } } },
            { new: true },
        )
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }
        const newIngredient = recipe.ingredients[recipe.ingredients.length - 1]
        res.status(201).json({ message: 'Ingredient added successfully', ingredient: newIngredient })
    } catch (error) {
        res.status(400).json({ message: 'Failed to add ingredient', error: error.message })
    }
}

export const updateIngredient = async (req: Request, res: Response) => {
    try {
        const updateFields: Partial<IIngredient> = {}

        if (req.body.name !== undefined) updateFields.name = req.body.name
        if (req.body.calories !== undefined) updateFields.calories = req.body.calories
        if (req.body.quantity !== undefined) updateFields.quantity = req.body.quantity
        if (req.body.price !== undefined) updateFields.price = req.body.price

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' })
        }

        const recipe = await Recipe.findOneAndUpdate(
            { _id: req.params.id, user: req.user?._id, 'ingredients._id': req.params.ingredientId },
            { $set: { 'ingredients.$': updateFields } },
            { new: true },
        )

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe or ingredient not found' })
        }

        const updatedIngredient = recipe.ingredients.find((i) => i._id.toString() === req.params.ingredientId)
        res.status(200).json({ message: 'Ingredient updated successfully', ingredient: updatedIngredient })
    } catch (error) {
        res.status(400).json({ message: 'Failed to update ingredient', error: error.message })
    }
}

export const deleteIngredient = async (req: Request, res: Response) => {
    try {
        const recipe = await Recipe.findOneAndUpdate(
            { _id: req.params.id, user: req.user?._id },
            { $pull: { ingredients: { _id: req.params.ingredientId } } },
            { new: true },
        )
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }
        res.status(200).json({ message: 'Ingredient deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete ingredient', error: error.message })
    }
}

export const getRecipeSteps = async (req: Request, res: Response) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, user: req.user?._id })
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }
        res.status(200).json({ message: 'Steps fetched successfully', steps: recipe.steps })
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch steps', error: error.message })
    }
}

export const addStep = async (req: Request, res: Response) => {
    try {
        const { description, order } = req.body
        const recipe = await Recipe.findOneAndUpdate(
            { _id: req.params.id, user: req.user?._id },
            { $push: { steps: { description, order } } },
            { new: true },
        )
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }
        const newStep = recipe.steps[recipe.steps.length - 1]
        res.status(201).json({ message: 'Step added successfully', step: newStep })
    } catch (error) {
        res.status(400).json({ message: 'Failed to add step', error: error.message })
    }
}

export const updateStep = async (req: Request, res: Response) => {
    try {
        const updateFields: Partial<IStep> = {}

        if (req.body.description !== undefined) updateFields.description = req.body.description
        if (req.body.order !== undefined) updateFields.order = req.body.order

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' })
        }

        const recipe = await Recipe.findOneAndUpdate(
            { _id: req.params.id, user: req.user?._id, 'steps._id': req.params.stepId },
            { $set: { 'steps.$': updateFields } },
            { new: true },
        )

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe or step not found' })
        }

        const updatedStep = recipe.steps.find((s) => s._id.toString() === req.params.stepId)
        res.status(200).json({ message: 'Step updated successfully', step: updatedStep })
    } catch (error) {
        res.status(400).json({ message: 'Failed to update step', error: error.message })
    }
}

export const deleteStep = async (req: Request, res: Response) => {
    try {
        const recipe = await Recipe.findOneAndUpdate(
            { _id: req.params.id, user: req.user?._id },
            { $pull: { steps: { _id: req.params.stepId } } },
            { new: true },
        )
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' })
        }
        res.status(200).json({ message: 'Step deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete step', error: error.message })
    }
}
