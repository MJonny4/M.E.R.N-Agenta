import React, { useEffect, useState } from 'react'
import { TStreak, TStreakHelper } from '../types/types'
import { getUserStreaks, createStreak, checkInStreak, getStreakHistory } from '../services/StreakService'
import StreakList from '../components/streaks/StreakList'
import StreakForm from '../components/streaks/StreakForm'
import StreakHistory from '../components/streaks/StreakHistory'

const Streak: React.FC = () => {
    const [streaks, setStreaks] = useState<TStreak[]>([])
    const [selectedStreak, setSelectedStreak] = useState<TStreak | null>(null)
    const [history, setHistory] = useState<TStreakHelper[]>([])

    useEffect(() => {
        fetchStreaks()
    }, [])

    const fetchStreaks = async () => {
        try {
            const data = await getUserStreaks()
            setStreaks(data)
        } catch (error) {
            console.error('Failed to fetch streaks:', error)
        }
    }

    const handleStreakSubmit = async (data: { name: string }) => {
        try {
            await createStreak(data.name)
            fetchStreaks()
        } catch (error) {
            console.error('Failed to create streak:', error)
        }
    }

    const handleCheckIn = async (id: string) => {
        try {
            await checkInStreak(id)
            fetchStreaks()
        } catch (error) {
            console.error('Failed to check in streak:', error)
        }
    }

    const handleViewHistory = async (id: string) => {
        try {
            const data = await getStreakHistory(id)
            setHistory(data)
            setSelectedStreak(streaks.find((streak) => streak._id === id) || null)
        } catch (error) {
            console.error('Failed to fetch streak history:', error)
        }
    }

    return (
        <div className='container mx-auto py-8'>
            <h2 className='text-2xl font-semibold mb-4'>Streaks</h2>
            <StreakForm onSubmit={handleStreakSubmit} />
            <StreakList streaks={streaks} onCheckIn={handleCheckIn} onViewHistory={handleViewHistory} />

            {selectedStreak && (
                <div className='mt-8'>
                    <h3 className='text-xl font-semibold mb-4'>Streak History: {selectedStreak.name}</h3>
                    <StreakHistory history={history} />
                </div>
            )}
        </div>
    )
}

export default Streak
