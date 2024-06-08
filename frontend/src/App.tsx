import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'

export default function App() {
    return (
        <BrowserRouter>
            {/* <Header /> */}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />

                <Route element={<ProtectedRoute />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
