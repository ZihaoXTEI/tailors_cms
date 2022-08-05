import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('baseentity_tb')
export default class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({
    name: 'create_at'
  })
  createAt!: Date

  @UpdateDateColumn({
    name: 'update_at'
  })
  updateAt!: Date
}
