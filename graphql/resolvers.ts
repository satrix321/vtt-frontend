import { Context } from './context'
import rollParser from '../modules/rollParser/rollParser'
import * as userQueries from './queries/user'
import * as gameQueries from './queries/game'
import * as authMutations from './mutations/auth'
import * as gameMutations from './mutations/game'

export default {
  Query: {
    ...userQueries,
    ...gameQueries,

    roll: (_: any, { equation, verbose }: { equation: string; verbose: boolean }, ctx: Context) => {
      return rollParser.parse(equation, {
        verbose,
      })
    },
  },
  Mutation: {
    ...authMutations,
    ...gameMutations,

    uploadFile: async (_: any, { file }: any, ctx: Context) => {
      const { stream, filename, mimetype, encoding } = await file

      // const s3Client = new S3()

      console.log('upload file resovler!')
      console.log(filename)
      // console.log(mimetype)
      // console.log(encoding)
      // console.log(stream)
    },
  },
}
