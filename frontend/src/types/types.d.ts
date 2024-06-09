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

export type LoginResponse = {
    message: string
    user?: {
        _id: string
        username: string
        email: string
    }
    token?: string
}
