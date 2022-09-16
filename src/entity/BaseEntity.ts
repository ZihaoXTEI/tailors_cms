import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('baseentity_tb')
export default class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({
    name: 'create_at',
    comment: '创建时间'
  })
  createAt!: Date

  @UpdateDateColumn({
    name: 'update_at',
    comment: '更新时间'
  })
  updateAt!: Date
}
