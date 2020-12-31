import { Context } from '@/graphql/context'
import { User, UserGetPayload } from '@prisma/client'

type UserWithGamesOwnedGames = UserGetPayload<{
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
  return await ctx.prisma.user.findOne({
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

  return ctx.prisma.user.findOne({
    where: {
      id: ctx.user.id,
    },
  })
}
