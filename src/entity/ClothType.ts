import { Season, Status } from '@/types/entityType'
import { Column, Entity } from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity('clothtype_tb')
export default class ClothType extends BaseEntity {
  @Column({
    name: 'clothtype_name',
    type: 'varchar',
    length: 32,
    unique: true,
    comment: '服装类型名称',
  })
  clothtypeName!: string

  @Column({
    name: 'clothtype_remark',
    type: 'varchar',
    length: 64,
    nullable: true,
    comment: '服装类型说明',
  })
  clothtypeRemark: string | undefined

  @Column({
    name: 'clothtype_season',
    type: 'enum',
    default: Season.SPRING,
    comment: '服装适合季节',
  })
  clothtypeSeason!: Season

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '服装类型状态',
  })
  status!: Status
}
