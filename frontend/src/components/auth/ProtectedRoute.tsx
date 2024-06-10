import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../../redux/store'
import Sidebar from '../Sidebar'

export default function ProtectedRoute() {
    const { currentUser } = useSelector((state: RootState) => state.user)

    if (!currentUser) {
        return <Navigate to='/login' />
    }

    return (
        <main className='flex min-h-screen overflow-hidden'>
            <Sidebar />
            <section className='flex-1 bg-light-coffee-cream p-5'>
                <Outlet />
            </section>
        </main>
    )
}
