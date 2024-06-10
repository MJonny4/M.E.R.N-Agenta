import React, { useEffect, useState } from 'react'
import { TIngredient, TRecipe, TStep } from '../types/types'
import {
    getAllRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    deleteIngredient,
    updateStep,
    addStep,
    deleteStep,
    updateIngredient,
    addIngredient,
} from '../services/RecipeService'
import RecipeList from '../components/recipes/RecipeList'
import RecipeForm from '../components/recipes/RecipeForm'
import IngredientList from '../components/recipes/IngredientList'
import IngredientForm from '../components/recipes/IngredientForm'
import StepList from '../components/recipes/StepList'
import StepForm from '../components/recipes/StepForm'

const Recipe: React.FC = () => {
    const [recipes, setRecipes] = useState<TRecipe[]>([])
    const [selectedRecipe, setSelectedRecipe] = useState<TRecipe | null>(null)

    useEffect(() => {
        fetchRecipes()
    }, [])

    const fetchRecipes = async () => {
        try {
            const data = await getAllRecipes()
            setRecipes(data)
        } catch (error) {
            console.error('Failed to fetch recipes:', error)
        }
    }

    const handleRecipeSubmit = async (data: Partial<TRecipe>) => {
        try {
            if (selectedRecipe) {
                await updateRecipe(selectedRecipe._id, data)
            } else {
                await createRecipe(data)
            }
            setSelectedRecipe(null)
            fetchRecipes()
        } catch (error) {
            console.error('Failed to submit recipe:', error)
        }
    }

    const handleDeleteRecipe = async (id: string) => {
        try {
            await deleteRecipe(id)
            fetchRecipes()
        } catch (error) {
            console.error('Failed to delete recipe:', error)
        }
    }

    const handleIngredientSubmit = async (ingredient: Partial<TIngredient>) => {
        try {
            if (selectedRecipe) {
                if (ingredient._id) {
                    await updateIngredient(selectedRecipe._id, ingredient._id, ingredient)
                } else {
                    await addIngredient(selectedRecipe._id, ingredient)
                }
                fetchRecipes()
            }
        } catch (error) {
            console.error('Failed to submit ingredient:', error)
        }
    }

    const handleDeleteIngredient = async (recipeId: string, ingredientId: string) => {
        try {
            await deleteIngredient(recipeId, ingredientId)
            fetchRecipes()
        } catch (error) {
            console.error('Failed to delete ingredient:', error)
        }
    }

    const handleStepSubmit = async (step: Partial<TStep>) => {
        try {
            if (selectedRecipe) {
                if (step._id) {
                    await updateStep(selectedRecipe._id, step._id, step)
                } else {
                    await addStep(selectedRecipe._id, step)
                }
                fetchRecipes()
            }
        } catch (error) {
            console.error('Failed to submit step:', error)
        }
    }

    const handleDeleteStep = async (recipeId: string, stepId: string) => {
        try {
            await deleteStep(recipeId, stepId)
            fetchRecipes()
        } catch (error) {
            console.error('Failed to delete step:', error)
        }
    }

    return (
        <div className='container mx-auto py-8'>
            <h2 className='text-2xl font-semibold mb-4'>Recipes</h2>
            {selectedRecipe ? (
                <>
                    <RecipeForm onSubmit={handleRecipeSubmit} initialValues={selectedRecipe} />
                    <button
                        className='bg-medium-coffee-latte text-white px-4 py-2 rounded mt-4'
                        onClick={() => setSelectedRecipe(null)}
                    >
                        Stop Editing
                    </button>
                    <article className='h-96 overflow-y-auto my-4'>
                        <div>
                            <h3 className='text-xl font-semibold mb-4'>Ingredients</h3>
                            <IngredientList
                                ingredients={selectedRecipe.ingredients}
                                onEdit={(ingredient) => handleIngredientSubmit(ingredient)}
                                onDelete={(ingredientId) => handleDeleteIngredient(selectedRecipe._id, ingredientId)}
                            />
                            <IngredientForm onSubmit={(ingredient) => handleIngredientSubmit(ingredient)} />
                        </div>
                        <div>
                            <h3 className='text-xl font-semibold mb-4'>Steps</h3>
                            <StepList
                                steps={selectedRecipe.steps}
                                onEdit={(step) => handleStepSubmit(step)}
                                onDelete={(stepId) => handleDeleteStep(selectedRecipe._id, stepId)}
                            />
                            <StepForm onSubmit={(step) => handleStepSubmit(step)} />
                        </div>
                    </article>
                </>
            ) : (
                <>
                    <RecipeForm onSubmit={handleRecipeSubmit} />
                    <RecipeList
                        recipes={recipes}
                        onEdit={(recipe) => setSelectedRecipe(recipe)}
                        onDelete={handleDeleteRecipe}
                    />
                </>
            )}
        </div>
    )
}

export default Recipe
