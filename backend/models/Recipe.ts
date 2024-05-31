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
import Ingredient from './Ingredient'
import Step from './Step'

@Entity({ name: 'recipes' })
class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    weight: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.recipes)
    user: User

    @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
    ingredients: Ingredient[]

    @OneToMany(() => Step, (step) => step.recipe)
    steps: Step[]
}

export default Recipe
