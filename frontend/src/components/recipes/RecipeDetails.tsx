import IngredientList from './IngredientList'
import IngredientForm from './IngredientForm'
import StepList from './StepList'
import StepForm from './StepForm'
import {
    addIngredient,
    addStep,
    deleteIngredient,
    deleteStep,
    getRecipeById,
    getRecipeIngredients,
    getRecipeSteps,
    updateIngredient,
    updateStep,
} from '../../services/RecipeService'
import { TIngredient, TRecipe, TStep } from '../../types/types'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const RecipeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [recipe, setRecipe] = useState<TRecipe | null>(null)
    const [ingredients, setIngredients] = useState<TIngredient[]>([])
    const [steps, setSteps] = useState<TStep[]>([])

    useEffect(() => {
        fetchRecipe()
        fetchIngredients()
        fetchSteps()
    }, [])

    const fetchRecipe = async () => {
        try {
            const data = await getRecipeById(id)
            setRecipe(data)
        } catch (error) {
            console.error('Failed to fetch recipe:', error)
        }
    }

    const fetchIngredients = async () => {
        try {
            const data = await getRecipeIngredients(id)
            setIngredients(data)
        } catch (error) {
            console.error('Failed to fetch ingredients:', error)
        }
    }

    const fetchSteps = async () => {
        try {
            const data = await getRecipeSteps(id)
            setSteps(data)
        } catch (error) {
            console.error('Failed to fetch steps:', error)
        }
    }

    const handleIngredientSubmit = async (data: Partial<TIngredient>) => {
        try {
            if (data._id) {
                await updateIngredient(id, data._id, data)
            } else {
                await addIngredient(id, data)
            }
            fetchIngredients()
        } catch (error) {
            console.error('Failed to submit ingredient:', error)
        }
    }

    const handleStepSubmit = async (data: Partial<TStep>) => {
        try {
            if (data._id) {
                await updateStep(id, data._id, data)
            } else {
                await addStep(id, data)
            }
            fetchSteps()
        } catch (error) {
            console.error('Failed to submit step:', error)
        }
    }

    const handleDeleteIngredient = async (ingredientId: string) => {
        try {
            await deleteIngredient(id, ingredientId)
            fetchIngredients()
        } catch (error) {
            console.error('Failed to delete ingredient:', error)
        }
    }

    const handleDeleteStep = async (stepId: string) => {
        try {
            await deleteStep(id, stepId)
            fetchSteps()
        } catch (error) {
            console.error('Failed to delete step:', error)
        }
    }

    if (!recipe) {
        return <div>Loading...</div>
    }

    return (
        <section className='container mx-auto py-8'>
            <h2 className='text-2xl font-semibold mb-4'>{recipe.name}</h2>
            <p className='text-mocha-brown'>Calories: {recipe.calories}</p>

            <article className='flex flex-row space-x-4 mt-8'>
                <div className='w-full h-[35rem] overflow-auto'>
                    <h3 className='text-xl font-semibold mb-4'>Ingredients</h3>
                    <IngredientList
                        ingredients={ingredients}
                        onEdit={(ingredient) => handleIngredientSubmit(ingredient)}
                        onDelete={handleDeleteIngredient}
                    />
                    <IngredientForm onSubmit={handleIngredientSubmit} />
                </div>

                <div className='w-full h-[35rem] overflow-auto'>
                    <h3 className='text-xl font-semibold mb-4'>Steps</h3>
                    <StepList steps={steps} onEdit={(step) => handleStepSubmit(step)} onDelete={handleDeleteStep} />
                    <StepForm onSubmit={handleStepSubmit} />
                </div>
            </article>
        </section>
    )
}

export default RecipeDetails
