import * as dotenv from 'dotenv'
dotenv.config()

const APP_HOST = process.env.APP_HOST
const APP_PORT = process.env.APP_PORT

export { APP_HOST, APP_PORT }
