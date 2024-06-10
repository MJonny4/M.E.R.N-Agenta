import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Banks from './pages/Banks'

const Logout = lazy(() => import('./components/auth/Logout'))
const Profile = lazy(() => import('./components/auth/Profile'))
const ProtectedRoute = lazy(() => import('./components/auth/ProtectedRoute'))
const About = lazy(() => import('./pages/About'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Market = lazy(() => import('./pages/Market'))

const Loading = () => (
    <div className='flex justify-center items-center min-h-screen bg-light-coffee-cream'>
        <div className='animate-pulse text-3xl text-mocha-brown'>Brewing your page...</div>
    </div>
)

export default function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/about' element={<About />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/banks' element={<Banks />} />
                        <Route path='/markets' element={<Market />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
