import { TRecipe, TIngredient, TStep } from '../types/types'
import axiosInstance from '../utils/axios'

export const getAllRecipes = async (): Promise<TRecipe[]> => {
    const response = await axiosInstance.get('/recipes')
    return response.data.recipes
}

export const getRecipeById = async (id: string): Promise<TRecipe> => {
    const response = await axiosInstance.get(`/recipes/${id}`)
    return response.data.recipe
}

export const createRecipe = async (recipe: Partial<TRecipe>): Promise<TRecipe> => {
    const response = await axiosInstance.post('/recipes', recipe)
    return response.data.recipe
}

export const updateRecipe = async (id: string, recipe: Partial<TRecipe>): Promise<TRecipe> => {
    const response = await axiosInstance.patch(`/recipes/${id}`, recipe)
    return response.data.recipe
}

export const deleteRecipe = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/recipes/${id}`)
}

export const getRecipeIngredients = async (id: string): Promise<TIngredient[]> => {
    const response = await axiosInstance.get(`/recipes/${id}/ingredients`)
    return response.data.ingredients
}

export const addIngredient = async (id: string, ingredient: Partial<TIngredient>): Promise<TIngredient> => {
    const response = await axiosInstance.post(`/recipes/${id}/ingredients`, ingredient)
    return response.data.ingredient
}

export const updateIngredient = async (
    recipeId: string,
    ingredientId: string,
    ingredient: Partial<TIngredient>,
): Promise<TIngredient> => {
    const response = await axiosInstance.patch(`/recipes/${recipeId}/ingredients/${ingredientId}`, ingredient)
    return response.data.ingredient
}

export const deleteIngredient = async (recipeId: string, ingredientId: string): Promise<void> => {
    await axiosInstance.delete(`/recipes/${recipeId}/ingredients/${ingredientId}`)
}

export const getRecipeSteps = async (id: string): Promise<TStep[]> => {
    const response = await axiosInstance.get(`/recipes/${id}/steps`)
    return response.data.steps
}

export const addStep = async (id: string, step: Partial<TStep>): Promise<TStep> => {
    const response = await axiosInstance.post(`/recipes/${id}/steps`, step)
    return response.data.step
}

export const updateStep = async (recipeId: string, stepId: string, step: Partial<TStep>): Promise<TStep> => {
    const response = await axiosInstance.patch(`/recipes/${recipeId}/steps/${stepId}`, step)
    return response.data.step
}

export const deleteStep = async (recipeId: string, stepId: string): Promise<void> => {
    await axiosInstance.delete(`/recipes/${recipeId}/steps/${stepId}`)
}
