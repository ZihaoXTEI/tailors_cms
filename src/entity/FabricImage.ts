import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from './BaseEntity'
import Fabric from './Fabric'

@Entity('fabric_image_tb')
export default class FabricImage extends BaseEntity {
  @Column({
    name: 'image_name',
    type: 'varchar',
    length: 64,
    unique: true,
    comment: '图片名称'
  })
  imageName!: string

  @Column({
    name: 'mimetype',
    type: 'varchar',
    length: 32,
    comment: '媒体类型'
  })
  mimetype!: string

  @Column({
    name: 'size',
    type: 'mediumint',
    unsigned: true,
    default: 0,
    comment: '文件大小'
  })
  size!: number

  @Column({
    name: 'url',
    type: 'varchar',
    length: 128,
    comment: '图片URL'
  })
  url!: string

  @Column({
    name: 'fabric_id',
    type: 'varchar',
    length: 36
  })
  fabricId!: string

  @ManyToOne(() => Fabric, (fabric) => fabric.fabricImageList)
  @JoinColumn({
    name: 'fabric_id'
  })
  fabric!: Fabric
}
