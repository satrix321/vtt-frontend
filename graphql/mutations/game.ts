import { Context } from '@/graphql/context'
import s3 from '@/modules/s3'
import { Game } from '@prisma/client'
import { FileUpload } from '@/graphql/types'

export const createGame = async (
  _: unknown,
  { name, description, file }: { name: string; description: string; file: Promise<FileUpload> },
  ctx: Context,
): Promise<Game> => {
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

  const user = await ctx.prisma.user.findUnique({
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
        backgroundFileName: filename,
      },
    })

    return game
  } catch (e) {
    throw new Error(e)
  }
}

export const updateGame = async (_: unknown, game: Game, ctx: Context): Promise<Game> => {
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

  const modifiedGame = await ctx.prisma.game.findUnique({
    where: {
      id: Number(game.id),
    },
  })

  if (!modifiedGame) {
    throw new Error("Game doesn't exist")
  }

  if (modifiedGame.backgroundUrl !== game.backgroundUrl) {
    //TODO ...handle S3
    throw new Error('Not implemented!')
    // s3.deleteObject({ Bucket: 'vtt', Key: game.backgroundUrl })
    // const response = await s3
    //   .upload({
    //     Bucket: 'vtt',
    //     Key: filename,
    //     Body: createReadStream(),
    //     ACL: 'public-read',
    //   })
    //   .promise()
  }

  Object.assign(modifiedGame, game)

  await ctx.prisma.game.update({
    where: { id: modifiedGame.id },
    data: game,
  })

  return modifiedGame
}

export const deleteGame = async (_: unknown, { id }: { id: number }, ctx: Context): Promise<Game> => {
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

  const game = await ctx.prisma.game.findUnique({
    where: {
      id: Number(id),
    },
  })

  console.log(game)

  if (!game) {
    throw new Error("Game doesn't exist")
  }

  if (game.backgroundUrl) {
    await s3
      .deleteObject({
        Bucket: 'vtt',
        Key: game.backgroundUrl,
      })
      .promise()
  }

  console.log(game)

  return await ctx.prisma.game.delete({
    where: {
      id: Number(id),
    },
  })
}

export const addPlayerToGame = async (
  _: unknown,
  { gameId, userId }: { gameId: number; userId: number },
  ctx: Context,
): Promise<Game> => {
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

  const game = await ctx.prisma.game.findUnique({
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

export const removePlayerFromGame = async (
  _: unknown,
  { gameId, userId }: { gameId: number; userId: number },
  ctx: Context,
): Promise<Game> => {
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

  const game = await ctx.prisma.game.findUnique({
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
