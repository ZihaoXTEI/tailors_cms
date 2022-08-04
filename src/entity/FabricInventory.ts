import { Column, Entity } from 'typeorm'

@Entity('fabric_inventory_tb')
export default class FabricInventory {
  @Column({
    name: 'inventory',
    type: 'double',
    default: 0.0,
    comment: '库存量',
  })
  inventory!: number

  @Column({
    name: 'position',
    type: 'varchar',
    length: 32,
    comment: '布料库存位置',
  })
  position!: string

  @Column({
    name: 'pre_volume',
    type: 'double',
    default: 0.0,
    comment: '布料预定用量',
  })
  preVolume!: number

  // fabric_id
}
