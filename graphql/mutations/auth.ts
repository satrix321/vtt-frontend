import { Context } from '@/graphql/context'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '../types'

const jwtSecret = 'my-secret-from-env-file-in-prod'

export const register = async (
  _: unknown,
  { email, password, username }: { email: string; password: string; username: string },
  ctx: Context,
): Promise<User> => {
  if (await ctx.prisma.user.findUnique({ where: { email } })) {
    throw new Error('Email already in use')
  }

  if (await ctx.prisma.user.findUnique({ where: { username } })) {
    throw new Error('Username already in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await ctx.prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  })

  return user
}

export const login = async (
  _: unknown,
  { email, password }: { email: string; password: string },
  ctx: Context,
): Promise<{ token: string; user: User }> => {
  const user = await ctx.prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error('Invalid Data')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new Error('Invalid Data')
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    jwtSecret,
    {
      expiresIn: '30d',
    },
  )

  return {
    token,
    user,
  }
}

export const autoLogin = async (_: unknown, { token }: { token: string }, ctx: Context): Promise<User | null> => {
  const decodedToken = jwt.decode(token) as TokenPayload | null

  if (decodedToken) {
    return await ctx.prisma.user.findUnique({
      where: { id: decodedToken.id },
    })
  }

  return null
}
