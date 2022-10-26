import { IsOptional, IsString, IsUUID, Max, Min } from 'class-validator'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import BaseEntity from './BaseEntity'
import Fabric from './Fabric'

@Entity('fabric_inventory_tb')
export default class FabricInventory extends BaseEntity {
  @Column({
    name: 'inventory',
    type: 'double',
    default: 0.0,
    comment: '库存量'
  })
  @Min(0, { message: '库存量不合法' })
  @Max(1000000, { message: '库存量不合法' })
  inventory!: number

  @Column({
    name: 'position',
    type: 'varchar',
    length: 32,
    nullable: true,
    comment: '布料库存位置'
  })
  @IsOptional()
  @IsString()
  position!: string

  @Column({
    name: 'pre_volume',
    type: 'double',
    default: 0.0,
    comment: '布料预定用量'
  })
  @Min(0, { message: '布料预定用量不合法' })
  @Max(100000, { message: '布料预定用量不合法' })
  preVolume!: number

  @Column({
    name: 'fabric_id',
    type: 'varchar',
    length: 36
  })
  @IsUUID()
  fabricId!: string

  @OneToOne(() => Fabric)
  @JoinColumn({
    name: 'fabric_id',
    referencedColumnName: 'id'
  })
  fabric!: Fabric
}
