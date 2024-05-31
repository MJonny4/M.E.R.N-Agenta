import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import Recipe from './Recipe'
import Ingredient from './Ingredient'

@Entity({ name: 'steps' })
class Step {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string

    @Column({ type: 'int', default: 1, nullable: false })
    order: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Recipe, (recipe) => recipe.steps)
    recipe: Recipe

    @OneToMany(() => Ingredient, (ingredient) => ingredient.step)
    ingredients: Ingredient[]
}

export default Step
