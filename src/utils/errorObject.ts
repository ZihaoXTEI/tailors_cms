export default class ErrorObject {
  errMsg: string
  status: string

  constructor(errMsg: string, status: string) {
    this.errMsg = errMsg
    this.status = status
  }
}
