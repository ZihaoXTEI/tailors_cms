// 性别
export enum Gender {
  MALE = '男',
  FEMALE = '女',
  BOTH = '中性'
}

// 状态
export enum Status {
  NORMAL = 1,
  BAN = 0
}

// 季节
export enum Season {
  SPRING = 0,
  SUMMER = 1,
  AUTUMN = 2,
  WINTER = 3
}

// 支付方式
export enum PaymentMethod {
  CASHPAYMENT = 0,
  ALIPAY = 1,
  WECHATPAYMENT = 2,
  UNIONPAY = 3,
  DIGITALYUAN = 4,
  OTHER = 5
}

// 客户端编号
export enum ClientType {
  CMS = 0,
  SHOP = 1,
  MINIPROGRAM = 2
}

// 布料幅宽
export enum FabricWidth {
  FW76 = 76,
  FW90 = 90,
  FW120 = 120,
  FW140 = 140,
  FW160 = 160
}

// 订单状态
export enum OrderStatus {
  CANCEL = 0, // 取消
  CREATED = 1, // 新创建
  TAILORED = 2, // 裁缝
  SEWED = 3, // 缝制
  IRONED = 4, // 整烫
  FINISHED = 5, // 完成
  DELIVERED = 6 // 交付
}
