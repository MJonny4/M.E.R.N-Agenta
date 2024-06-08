import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedRoute() {
    const { currentUser } = useSelector((state: RootState) => state.user)
    return currentUser ? <Outlet /> : <Navigate to={'/login'} />
}
