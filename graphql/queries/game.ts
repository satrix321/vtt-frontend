import { Context } from '@/graphql/context'
import { Prisma } from '@prisma/client'

type GameWithOwnerPlayers = Prisma.GameGetPayload<{
  include: {
    owner: true
    players: true
  }
}>

type GameWithPlayers = Prisma.GameGetPayload<{
  include: {
    players: true
  }
}>

export const game = async (_: unknown, { id }: { id: number }, ctx: Context): Promise<GameWithOwnerPlayers | null> => {
  return await ctx.prisma.game.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      owner: true,
      players: true,
    },
  })
}

export const games = async (
  _: unknown,
  { userId }: { userId: number },
  ctx: Context,
): Promise<GameWithPlayers[] | undefined> => {
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

  const user = await ctx.prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    include: {
      games: {
        include: {
          players: true,
        },
      },
    },
  })

  return user?.games
}
