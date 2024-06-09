import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import Header from './components/Header'
import Register from './pages/Register'
import Profile from './components/auth/Profile'
import Logout from './components/auth/Logout'

export default function App() {
    const { currentUser } = useSelector((state: RootState) => state.user)

    return (
        <BrowserRouter>
            {!currentUser && <Header />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/about' element={<About />} />

                <Route element={<ProtectedRoute />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/logout' element={<Logout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
