import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface UserDataPayload {
    _id: string
}

declare global {
    namespace Express {
        interface Request {
            user?: UserDataPayload
        }
    }
}

/**
 * Middleware function to authenticate requests using JWT token.
 * If the token is valid, it decodes the token and attaches the user data to the request object.
 * If the token is missing or invalid, it returns a 401 Unauthorized response.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 */
export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response<any, Record<string, any>>> => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: '401, Not authorized' })
        }

        const decoded = verify(token, process.env.JWT_SECRET!) as UserDataPayload

        req.user = decoded

        next()
    } catch (error) {
        return res.clearCookie('token').status(401).json({ message: '401, Invalid Token' })
    }
}

/**
 * If the user is already authenticated (token exists in cookies), it returns a 403 Forbidden response.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next function to call in the middleware chain.
 * @returns A Promise that resolves to void.
 */
export const notAuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response<void, Record<string, any>>> => {
    const token = req.cookies.token

    if (token) {
        return res.status(403).json({ message: '403, Forbidden' })
    }

    next()
}
