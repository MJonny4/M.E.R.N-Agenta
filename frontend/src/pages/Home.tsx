import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md'>
                <h2 className='text-2xl font-bold text-center'>Home Page</h2>
                <Link to='/login' className='block text-center text-blue-500 hover:underline'>
                    Login
                </Link>
                <Link to='/dashboard' className='block text-center text-blue-500 hover:underline'>
                    Dashboard
                </Link>
            </div>
        </div>
    )
}
