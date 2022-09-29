import { Status } from '../types/entityType'
import { Column, Entity, OneToMany } from 'typeorm'
import Fabric from './Fabric'
import BaseEntity from './BaseEntity'
import { Length } from 'class-validator'

@Entity('fabrictype_tb')
export default class FabricType extends BaseEntity {
  @Column({
    name: 'fabrictype_name',
    type: 'varchar',
    length: 24,
    unique: true,
    comment: '布料类型名称'
  })
  @Length(2, 24, { message: '布料类型名称长度在 2 ~ 24 个字符' })
  fabrictypeName!: string

  @Column({
    name: 'fabrictype_remark',
    type: 'varchar',
    length: 64,
    comment: '布料类型说明'
  })
  @Length(0, 64, { message: '布料类型说明不超过 64 个字符' })
  fabrictypeRemark: string | undefined

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '布料类型状态'
  })
  status!: Status

  @OneToMany(() => Fabric, (fabric) => fabric.fabricType)
  fabricList!: Fabric[]
}
