import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import Recipe from './Recipe'
import Step from './Step'

@Entity({ name: 'ingredients' })
class Ingredient {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string

    @Column({ type: 'int', nullable: false })
    quantity: number

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    weight: number

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    price: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
    recipe: Recipe

    @ManyToOne(() => Step, (step) => step.ingredients)
    step: Step
}

export default Ingredient
