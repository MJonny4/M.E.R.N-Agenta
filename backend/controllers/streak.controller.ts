import { Request, Response } from 'express'
import Streak from '../models/Streak'
import StreakHelper from '../models/StreaksHelper'

export const createStreak = async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const streak = new Streak({ name, user: req.user?._id })
        await streak.save()
        res.status(201).json({ message: 'Streak created successfully', streak })
    } catch (error) {
        res.status(400).json({ message: 'Failed to create streak', error: error.message })
    }
}

export const getUserStreaks = async (req: Request, res: Response) => {
    try {
        const streaks = await Streak.find({ user: req.user?._id })
        res.status(200).json({ message: 'Streaks fetched successfully', streaks })
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch streaks', error: error.message })
    }
}

export const checkInStreak = async (req: Request, res: Response) => {
    try {
        const streak = await Streak.findOne({ _id: req.params.id, user: req.user?._id })
        if (!streak) return res.status(404).json({ message: 'Streak not found' })

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        let streakHelper = await StreakHelper.findOne({ streak: streak._id, dateChecked: today })

        if (streakHelper) {
            if (streakHelper.checked) {
                return res.status(400).json({ message: 'Already checked in for today' })
            }
            streakHelper.checked = true
            await streakHelper.save()
        } else {
            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate() - 1)

            const isConsecutive = await StreakHelper.exists({
                streak: streak._id,
                dateChecked: yesterday,
                checked: true,
            })

            streakHelper = new StreakHelper({ streak: streak._id, dateChecked: today, checked: true })
            await streakHelper.save()

            if (isConsecutive) {
                streak.count += 1
            } else {
                if (streak.count !== 0) {
                    streak.count += 1
                } else {
                    streak.count = 1
                }
            }
            streak.lastCheckedDate = today
            await streak.save()
        }

        res.status(200).json({ message: 'Streak checked in successfully', streak, streakHelper })
    } catch (error) {
        res.status(500).json({ message: 'Failed to check in streak', error: error.message })
    }
}

export const getStreakHistory = async (req: Request, res: Response) => {
    try {
        const streak = await Streak.findOne({ _id: req.params.id, user: req.user?._id })
        if (!streak) return res.status(404).json({ message: 'Streak not found' })

        const history = await StreakHelper.find({ streak: streak._id }).sort({ dateChecked: -1 })
        res.status(200).json({ message: 'Streak history fetched successfully', history })
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch streak history', error: error.message })
    }
}
