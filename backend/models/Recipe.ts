import mongoose, { Document, Schema } from 'mongoose'

export interface IIngredient {
    _id: mongoose.Types.ObjectId
    name: string
    calories: number
    quantity: number
    price: number
}

export interface IStep {
    _id: mongoose.Types.ObjectId
    description: string
    order: number
}

export interface IRecipe extends Document {
    name: string
    calories: number
    user: mongoose.Types.ObjectId
    ingredients: IIngredient[]
    steps: IStep[]
}

const IngredientSchema = new Schema<IIngredient>(
    {
        name: { type: String, required: true },
        calories: { type: Number, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    { timestamps: true },
)

const StepSchema = new Schema<IStep>(
    {
        description: { type: String, required: true },
        order: { type: Number, required: true },
    },
    { timestamps: true },
)

const RecipeSchema = new Schema<IRecipe>(
    {
        name: { type: String, required: true },
        calories: { type: Number, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        ingredients: [IngredientSchema],
        steps: [StepSchema],
    },
    { timestamps: true },
)

export default mongoose.model<IRecipe>('Recipe', RecipeSchema)
