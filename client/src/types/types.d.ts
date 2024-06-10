export type TUser = {
    _id: string
    username: string
    email: string
}

// *** AXIOS ERROR RESPONSE ***
export type TError = {
    type: string
    msg: string
    path: string
    location: string
}

export type TErrorResponse = {
    message: string | Error[]
}

export type TSuccessResponse = {
    message: string
    user: User
    token: string
}
// *** END OF AXIOS ERROR RESPONSE ***

// *** BANKS ***

export type TBank = {
    _id: string
    user: string
    name: string
    balance: number
    movements: Movement[]
}

export type TMovementType = 'rent' | 'salary' | 'food' | 'clothes' | 'other'

export type TMovement = {
    _id: string
    description: string
    date: Date
    operation: boolean
    money: number
    quantity: number
    type: MovementType
}

export type TMovementFilters = {
    description?: string
    startDate?: string
    endDate?: string
    operation?: string // Note: This will be checked against 'true' string in the code
    minMoney?: string // Will be converted to Number
    maxMoney?: string // Will be converted to Number
    minQuantity?: string // Will be converted to Number
    maxQuantity?: string // Will be converted to Number
    type?: MovementType
}

export type TMarket = {
    _id: string
    name: string
    user: string
    shops: TShop[]
}

export type TShop = {
    _id: string
    product: string
    quantity: number
    price: number
    date: Date
}

export type TIngredient = {
    _id: string
    name: string
    calories: number
    quantity: number
    price: number
}

export type TStep = {
    _id: string
    description: string
    order: number
}

export type TRecipe = {
    _id: string
    name: string
    calories: number
    user: string
    ingredients: TIngredient[]
    steps: TStep[]
    createdAt: string
    updatedAt: string
}

export type TStreak = {
    _id: string
    name: string
    count: number
    user: string
    lastCheckedDate: string | null
    createdAt: string
    updatedAt: string
}

export type TStreakHelper = {
    _id: string
    streak: string
    dateChecked: string
    checked: boolean
    createdAt: string
    updatedAt: string
}
