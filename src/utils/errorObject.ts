export default class ErrorObject {
  errMsg: string
  status: string
  errData: any

  constructor(errMsg: string, status: string, errData?: any) {
    this.errMsg = errMsg
    this.status = status
    this.errData = errData
  }
}
