import { Context } from '@/graphql/context'

export const user = async (_: any, { id }: any, ctx: Context) => {
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

export const currentUser = async (_: any, _args: any, ctx: Context) => {
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

  return ctx.prisma.user.findOne({
    where: {
      id: ctx.user.id,
    },
  })
}
