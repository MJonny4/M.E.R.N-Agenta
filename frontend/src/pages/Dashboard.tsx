import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <main>
            <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
                <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
                    Find your next <span className='text-slate-500'>perfect</span>
                    <br /> place with ease
                </h1>
                <div className='text-gray-400 text-xs sm:text-base lg:text-lg'>
                    Munti Estates is the best place your next perfect place to live.
                </div>
                <Link
                    to={'/search'}
                    className='text-xs sm:text-base text-blue-800 font-bold hover:underline lg:text-lg'
                >
                    Let&apos;s Start now
                </Link>
            </div>
        </main>
    )
}
