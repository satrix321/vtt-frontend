import { Context } from '../context'

export const game = async (_: any, { id }: any, ctx: Context) => {
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

export const games = async (_: any, { userId }: any, ctx: Context) => {
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
