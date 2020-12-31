import rollParser from '@/modules/rollParser/rollParser'
import { Context } from './context'
import * as authMutations from './mutations/auth'
import * as gameMutations from './mutations/game'
import * as gameQueries from './queries/game'
import * as userQueries from './queries/user'

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
  },
}
