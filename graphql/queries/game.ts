import { Context } from '@/graphql/context'
import { GameGetPayload } from '@prisma/client'

type GameWithOwnerPlayers = GameGetPayload<{
  include: {
    owner: true
    players: true
  }
}>

type GameWithPlayers = GameGetPayload<{
  include: {
    players: true
  }
}>

export const game = async (_: unknown, { id }: { id: number }, ctx: Context): Promise<GameWithOwnerPlayers | null> => {
  return await ctx.prisma.game.findOne({
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
  const user = await ctx.prisma.user.findOne({
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
