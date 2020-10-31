import { Context } from '../context'

export const createGame = async (_: any, { ownerId, name, description, file }: any, ctx: Context) => {
  console.log(typeof ownerId)
  console.log(typeof name)
  console.log(typeof description)
  console.log(typeof file)

  // const { stream, filename, mimetype, encoding } = await file

  // console.log(filename)
  // console.log(mimetype)
  // console.log(encoding)
  // console.log(stream)

  // console.log(ownerId)
  // console.log(name)
  // console.log(description)

  // console.log('create game resolver!')
  return { name }

  // const user = await ctx.prisma.user.findOne({
  //   where: {
  //     id: Number(ownerId)
  //   }
  // })
  // if (!user) {
  //   throw new Error('The user with the provided id doesn\'t exit.')
  // }

  // const game = await ctx.prisma.game.create({
  //   data: {
  //     name,
  //     description,
  //     owner: {
  //       connect: { id: Number(ownerId) }
  //     },
  //     players: {
  //       connect: {
  //         id: Number(ownerId)
  //       }
  //     }
  //   }
  // })

  // return game
}

export const deleteGame = async (_: any, { id }: any, ctx: Context) => {
  return await ctx.prisma.game.delete({
    where: {
      id: Number(id),
    },
  })
}

export const addPlayerToGame = async (_: any, { gameId, userId }: any, ctx: Context) => {
  const game = await ctx.prisma.game.findOne({
    where: {
      id: Number(gameId),
    },
    include: {
      owner: true,
      players: true,
    },
  })

  if (!game) {
    throw new Error("The game with the provided id doesn't exist.")
  }

  if (!ctx.user || game.ownerId !== ctx.user.id) {
    throw new Error('You are not the owner of the game.')
  }

  if (game.players.find((user) => user.id === Number(userId))) {
    throw new Error('The player is already added to this game.')
  }

  return await ctx.prisma.game.update({
    where: {
      id: Number(gameId),
    },
    data: {
      players: {
        connect: {
          id: Number(userId),
        },
      },
    },
    include: {
      players: true,
    },
  })
}

export const removePlayerFromGame = async (_: any, { gameId, userId }: any, ctx: Context) => {
  const game = await ctx.prisma.game.findOne({
    where: {
      id: Number(gameId),
    },
    include: {
      owner: true,
      players: true,
    },
  })

  if (!game) {
    throw new Error("The game with the provided id doesn't exist.")
  }

  if (!ctx.user || game.ownerId !== ctx.user.id) {
    throw new Error('You are not the owner of the game.')
  }

  if (!game.players.find((user) => user.id === Number(userId))) {
    throw new Error("The player isn't part of this game.")
  }

  return await ctx.prisma.game.update({
    where: {
      id: Number(gameId),
    },
    data: {
      players: {
        disconnect: {
          id: Number(userId),
        },
      },
    },
    include: {
      players: true,
    },
  })
}
