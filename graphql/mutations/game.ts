import { Context } from '@/graphql/context'
import s3 from '@/modules/s3'
import { Game } from '@prisma/client'
import { GameInput } from '@/graphql/generated'
import { FileUpload } from '@/graphql/types'

const gameBucket = 'vtt'

export const createGame = async (
  _: unknown,
  { name, description, backgroundImage }: { name: string; description: string; backgroundImage: Promise<FileUpload> },
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

  const { filename, createReadStream } = await backgroundImage

  try {
    const response = await s3
      .upload({
        Bucket: gameBucket,
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
    throw new Error(e)
  }
}

export const updateGame = async (_: unknown, { game: gameInput }: { game: GameInput }, ctx: Context): Promise<Game> => {
  if (!ctx.user) {
    throw new Error('Not Authenticated')
  }

  const game = await ctx.prisma.game.findUnique({
    where: {
      id: Number(gameInput.id),
    },
  })

  if (!game) {
    throw new Error("Game doesn't exist")
  }

  console.log(game)
  console.log(gameInput)

  //TODO: implement S3 support

  // if (gameInput.backgroundUrl !== undefined) {
  //   if (gameInput.backgroundUrl === null && game.backgroundUrl) {
  //     await s3
  //       .deleteObject({
  //         Bucket: gameBucket,
  //         Key: game.backgroundUrl,
  //       })
  //       .promise()
  //   }

  //   // if (gameInput.backgroundUrl) {
  //   //   const response = await s3
  //   //     .upload({
  //   //       Bucket: gameBucket,
  //   //       Key: filename,
  //   //       Body: createReadStream(),
  //   //       ACL: 'public-read',
  //   //     })
  //   //     .promise()
  //   // }
  // }

  Object.assign(game, gameInput)

  await ctx.prisma.game.update({
    where: { id: Number(game.id) },
    data: {
      id: Number(game.id),
      name: gameInput.name,
      description: gameInput.description,
    },
  })

  return game
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

  if (!game) {
    throw new Error("Game doesn't exist")
  }

  if (game.backgroundUrl) {
    await s3
      .deleteObject({
        Bucket: gameBucket,
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
