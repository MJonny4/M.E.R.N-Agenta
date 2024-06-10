import { TStreak, TStreakHelper } from '../types/types'
import axiosInstance from '../utils/axios'

export const createStreak = async (name: string): Promise<TStreak> => {
    const response = await axiosInstance.post('/streaks', { name })
    return response.data.streak
}

export const getUserStreaks = async (): Promise<TStreak[]> => {
    const response = await axiosInstance.get('/streaks')
    return response.data.streaks
}

export const checkInStreak = async (id: string): Promise<{ streak: TStreak; streakHelper: TStreakHelper }> => {
    const response = await axiosInstance.post(`/streaks/${id}/check-in`)
    return response.data
}

export const getStreakHistory = async (id: string): Promise<TStreakHelper[]> => {
    const response = await axiosInstance.get(`/streaks/${id}/history`)
    return response.data.history
}
