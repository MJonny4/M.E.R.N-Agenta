import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from '../Sidebar'

export default function ProtectedRoute() {
    const { currentUser } = useSelector((state: RootState) => state.user)

    if (!currentUser) {
        return <Navigate to='/login' />
    }

    return (
        <main className='flex min-h-screen'>
            <Sidebar />
            <section className='flex-grow'>
                <Outlet />
            </section>
        </main>
    )
}
