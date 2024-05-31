import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'
import User from './User'
import StreakHelper from './StreaksHelper'

@Entity({ name: 'streaks' })
class Streak {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string

    @Column({ type: 'int', nullable: false, default: 0 })
    number: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.streaks)
    user: User

    @OneToMany(() => StreakHelper, (streakHelper) => streakHelper.streak)
    streakHelpers: StreakHelper[]
}

export default Streak
