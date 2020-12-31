import { Context } from '@/graphql/context'
import s3 from '@/modules/s3'
import { Game } from '@prisma/client'

export const createGame = async (_: any, { name, description, file }: any, ctx: Context) => {
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

  const user = await ctx.prisma.user.findOne({
    where: {
      id: Number(ctx.user.id),
    },
  })
  if (!user) {
    throw new Error("The user with the provided id doesn't exit.")
  }

  const { filename, createReadStream } = await file

  try {
    const response = await s3
      .upload({
        Bucket: 'vtt',
        Key: filename,
        Body: createReadStream(),
        ACL: 'public-read',
      })
      .promise()

    const game = await ctx.prisma.game.create({
      data: {
        name,
        description,
        owner: {
          connect: { id: Number(ctx.user.id) },
        },
        players: {
          connect: {
            id: Number(ctx.user.id),
          },
        },
        backgroundUrl: response.Location,
      },
    })

    return game
  } catch (e) {
    throw new Error('Internal Server Error')
  }
}

export const modifyGame = async (_: any, game: Game, ctx: Context) => {
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

  const modGame = await ctx.prisma.game.findOne({
    where: {
      id: Number(game.id),
    },
  })

  if (!modGame) {
    throw new Error("Game doesn't exist")
  }

  if (modGame.backgroundUrl !== game.backgroundUrl) {
    // ...handle S3
    throw new Error('Not implemented!')
  }

  Object.assign(modGame, game)

  await ctx.prisma.game.update({
    where: { id: modGame.id },
    data: game,
  })

  return modGame
}

export const deleteGame = async (_: any, { id }: any, ctx: Context) => {
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

  const game = await ctx.prisma.game.findOne({
    where: {
      id: Number(id),
    },
  })

  if (!game) {
    throw new Error("Game doesn't exist")
  }

  if (game.backgroundUrl) {
    await s3
      .deleteObject(
        {
          Bucket: 'vtt',
          Key: game.backgroundUrl,
        },
        undefined,
      )
      .promise()
  }

  return await ctx.prisma.game.delete({
    where: {
      id: Number(id),
    },
  })
}

export const addPlayerToGame = async (_: any, { gameId, userId }: any, ctx: Context) => {
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

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
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

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
