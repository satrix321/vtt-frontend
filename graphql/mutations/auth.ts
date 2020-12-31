import { Context } from '@/graphql/context'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const jwtSecret = 'my-secret-from-env-file-in-prod'

export const register = async (_: any, { email, password, username }: any, ctx: Context) => {
  if (await ctx.prisma.user.findOne({ where: { email } })) {
    throw new Error('Email already in use')
  }

  if (await ctx.prisma.user.findOne({ where: { username } })) {
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

export const login = async (_: any, { email, password }: any, ctx: Context) => {
  const user = await ctx.prisma.user.findOne({
    where: { email },
  })

  if (!user) {
    throw new Error('Invalid Login')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new Error('Invalid Login')
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

export const autoLogin = async (_: any, { token }: any, ctx: Context) => {
  const decodedToken = jwt.decode(token) as any

  if (decodedToken) {
    return await ctx.prisma.user.findOne({
      where: { id: decodedToken.id },
    })
  }

  return null
}
