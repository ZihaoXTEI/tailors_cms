import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({
    name: 'create_at',
  })
  createAt!: Date

  @UpdateDateColumn({
    name: 'update_at',
  })
  updateAt!: Date
}
