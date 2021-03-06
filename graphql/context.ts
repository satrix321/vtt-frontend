import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { TokenPayload } from './types'

const jwtSecret = 'my-secret-from-env-file-in-prod'

const prisma = new PrismaClient()

export type Context = {
  user: TokenPayload | null
  prisma: PrismaClient
}

const getUser = (token: string) => {
  try {
    if (token) {
      return jwt.verify(token, jwtSecret) as TokenPayload
    }
    return null
  } catch (err) {
    return null
  }
}

export function createContext({ req }: any): Context {
  const tokenWithBearer = req.headers.authorization || ''
  const token = tokenWithBearer.split(' ')[1]
  const user = getUser(token)

  return {
    user,
    prisma,
  }
}

export function destroyContext(): Promise<unknown> {
  return prisma.$disconnect()
}
