export default class SuccessObject {
  message: string
  status: number
  data: any

  constructor(status: number, message: string, data?: any) {
    this.message = message
    this.status = status
    this.data = data
  }
}
