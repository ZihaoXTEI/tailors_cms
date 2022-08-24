export default class ErrorType {
  public static readonly UNAUTHORIZED = 'UNAUTHORIZED' //401
  public static readonly FORBIDDEN = 'FORBIDDEN' // 403
  public static readonly BAD_REQUEST = 'BAD REQUEST' // 400
  public static readonly PAYMENT_REQUIRED = 'PAYMENTREQUIRED' // 402
  public static readonly METHOD_NOT_ALLOWED = 'METHOD NOT ALLOWED' // 405
  public static readonly INTERNAL_SERVER_ERROR = 'INTERNAL SERVER ERROR' // 500
}
