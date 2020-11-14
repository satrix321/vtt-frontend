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
  },
}
