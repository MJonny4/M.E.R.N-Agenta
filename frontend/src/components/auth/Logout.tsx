import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutStart, logoutSuccess, logoutFailure, clearError } from '../../redux/user/userSlice'

const Logout: FC = () => {
    const dispatch = useDispatch()
    dispatch(clearError())
    const navigate = useNavigate()

    useEffect(() => {
        const performLogout = async () => {
            dispatch(logoutStart())

            try {
                const res = await fetch('/api/v1/auth/logout', {
                    method: 'POST',
                    credentials: 'include',
                })

                if (res.ok) {
                    dispatch(logoutSuccess())
                    navigate('/')
                } else {
                    const data = await res.json()
                    dispatch(logoutFailure(data.message || 'Logout failed'))
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
                dispatch(logoutFailure(errorMessage))
            }
        }

        performLogout()
    }, [dispatch, navigate])

    return null
}

export default Logout
