import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const jwtSecret = 'my-secret-from-env-file-in-prod'

const prisma = new PrismaClient()

export interface Context {
  user: any,
  prisma: PrismaClient,
}

const getUser = (token: string) => {
  try {
    if (token) {
      return jwt.verify(token, jwtSecret)
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

export function destroyContext(): Promise<any> {
  return prisma.disconnect()
}