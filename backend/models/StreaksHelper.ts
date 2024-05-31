import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import Streak from './Streak'

@Entity({ name: 'streaks_helper' })
class StreakHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'uuid', nullable: false })
    streakId: string

    @Column({ type: 'date', nullable: false })
    date_checked: Date

    @Column({ type: 'boolean', nullable: false })
    check: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Streak, (streak) => streak.streakHelpers)
    streak: Streak
}

export default StreakHelper
