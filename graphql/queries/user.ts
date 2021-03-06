import { Context } from '@/graphql/context'
import { User, Prisma } from '@prisma/client'

type UserWithGamesOwnedGames = Prisma.UserGetPayload<{
  include: {
    games: true
    ownedGames: true
  }
}>

export const user = async (
  _: unknown,
  { id }: { id: number },
  ctx: Context,
): Promise<UserWithGamesOwnedGames | null> => {
  return await ctx.prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      games: true,
      ownedGames: true,
    },
  })
}

export const currentUser = async (_: unknown, _args: unknown, ctx: Context): Promise<User | null> => {
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

  return ctx.prisma.user.findUnique({
    where: {
      id: ctx.user.id,
    },
  })
}
