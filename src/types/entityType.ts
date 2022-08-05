export enum Gender {
  MALE = '男',
  FEMALE = '女'
}

export enum Status {
  NORMAL = 1,
  BAN = 0
}

export enum Season {
  SPRING = 0,
  SUMMER = 1,
  AUTUMN = 2,
  WINTER = 3
}

export enum PaymentMethod {
  CASHPAYMENT = 0,
  ALIPAY = 1,
  WECHATPAYMENT = 2,
  UNIONPAY = 3,
  DIGITALYUAN = 4,
  OTHER = 5
}

export enum MenuType {
  CMS = 0,
  SHOP = 1,
  MINIPROGRAM = 2
}

export enum OrderStatus {
  CANCEL = 0, // 取消
  CREATED = 1, // 新创建
  TAILORED = 2, // 裁缝
  SEWED = 3, // 缝制
  IRONED = 4, // 整烫
  FINISHED = 5, // 完成
  DELIVERED = 6 // 交付
}
