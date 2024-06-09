import React from 'react'
import { FaUniversity, FaStore, FaUtensils, FaTrophy } from 'react-icons/fa'
import Card from '../components/Card'

const Dashboard: React.FC = () => {
    return (
        <>
            <h1 className='text-4xl font-bold mb-8 text-rich-chocolate'>Dashboard</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                <Card
                    title='Banks & Movements'
                    description='Track your financial transactions and manage your bank accounts.'
                    icon={<FaUniversity />}
                />
                <Card
                    title='Markets & Shops'
                    description='Discover local markets and shops for your daily needs.'
                    icon={<FaStore />}
                />
                <Card
                    title='Recipes'
                    description='Explore delicious recipes with step-by-step guides and ingredient lists.'
                    icon={<FaUtensils />}
                />
                <Card
                    title='Streaks'
                    description='Stay motivated and track your progress with daily streaks.'
                    icon={<FaTrophy />}
                />
            </div>
        </>
    )
}

export default Dashboard
