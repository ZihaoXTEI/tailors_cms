import { readFileSync } from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config()

const APP_HOST = process.env.APP_HOST
const APP_PORT = process.env.APP_PORT

// readFileSync() 中的相对路径是相对于 process.cwd()
const PRIVATE_KEY = readFileSync(path.resolve(__dirname, './key/private.key'))
const PUBLIC_KEY = readFileSync(path.resolve(__dirname, './key/public.key'))

export { APP_HOST, APP_PORT, PRIVATE_KEY, PUBLIC_KEY }
