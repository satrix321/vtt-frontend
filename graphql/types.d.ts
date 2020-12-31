import { ReadStream } from 'fs'

export type FileUpload = {
  filename: string
  mimetype: string
  encoding: string
  createReadStream(): ReadStream
}

export type TokenPayload = {
  id: number
  email: string
  iat: number
  exp: number
}
