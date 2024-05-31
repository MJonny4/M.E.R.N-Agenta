import { Router } from 'express'
import { authMiddleware, notAuthMiddleware } from '../middlewares/auth.middleware'
import { loginUser, registerUser, logoutUser } from './../controllers/auth.controller'
import { validateLogin, validateRegistration } from './../validators/auth.validators'

const router = Router()

router.post('/register', notAuthMiddleware, validateRegistration, registerUser)
router.post('/login', validateLogin, loginUser)
router.post('/logout', authMiddleware, logoutUser)

// #FIXME: DELETE THIS ROUTE LATER
router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'User authenticated', user: req.user })
})

export default router
