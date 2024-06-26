import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import Logging from './utils/logger'

import authRouter from './routes/auth.routes'
import banksRouter from './routes/bank.routes'
import marketRouter from './routes/market.routes'
import recipesRouter from './routes/recipe.routes'
import streaksRouter from './routes/streak.routes'
import path from 'path'

mongoose
    .connect(String(process.env.MONGO_URL), {
        dbName: process.env.DB_NAME,
    })
    .then(() => {
        Logging.info('[🟩] Connected to MongoDB')
        startServer()
    })
    .catch((error) => {
        Logging.error(`[🟥] Error connecting to MongoDB: ${error}`)
    })

const startServer = async () => {
    const app = express()
    const PORT = process?.env?.PORT || 3000

    // Configurations
    app.use(
        cors({
            credentials: true,
            origin: ['http://localhost:4321', 'http://localhost:5173', '*'],
        }),
    )
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cookieParser())

    // Rules for the API
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
            return res.status(200).json({})
        }

        next()
    })

    // Informations
    app.use((req: Request, res: Response, next: NextFunction) => {
        Logging.info(`[🔽] Incoming => [Method: ${req.method}] -- [URL: ${req.url}] -- [IP: ${req.ip} 🖥️ ]`)

        res.on('finish', () => {
            Logging.info(
                `[🔼] Outgoing => [Method: ${req.method}] -- [URL: ${req.url}] -- [IP: ${req.socket.remoteAddress} 🖥️ ] -- [Status: ${res.statusCode}]\n`,
            )
        })

        next()
    })

    // Routes
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/banks', banksRouter)
    app.use('/api/v1/markets', marketRouter)
    app.use('/api/v1/recipes', recipesRouter)
    app.use('/api/v1/streaks', streaksRouter)

    // Serve the client
    app.use((req, res, next) => {
        if (/(.ico|.js|.css|.jpg|.png|.map|.webp)$/i.test(req.path)) {
            next()
        } else {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            res.header('Expires', '-1')
            res.header('Pragma', 'no-cache')
            res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
        }
    })

    app.use(express.static(path.join(__dirname, './client/dist')))

    // Error handling
    app.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error('Not found')
        Logging.error(`[🚨] Not found -- [Method: ${req.method}] -- [URL: ${req.url}]\n`)

        return res.status(404).json({
            message: error.message,
        })
    })

    app.listen(PORT, () => {
        Logging.info(`[🚀] Server is running on http://localhost:${PORT}`)
    })
}
