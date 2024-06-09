export type User = {
    _id: string
    username: string
    email: string
}

export type Error = {
    type: string
    msg: string
    path: string
    location: string
}

export type ErrorResponse = {
    message: string | Error[]
}

export type SuccessResponse = {
    message: string
    user: User
    token: string
}

export type MovementType = 'rent' | 'salary' | 'food' | 'clothes' | 'other'

export interface Movement {
    _id: string
    description: string
    date: Date
    operation: boolean
    money: number
    quantity: number
    type: MovementType
}

export interface Bank {
    _id: string
    user: string
    name: string
    balance: number
    movements: Movement[]
}
