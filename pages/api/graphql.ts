import { createContext } from '@/graphql/context'
import resolvers from '@/graphql/resolvers'
import typeDefs from '@/graphql/typeDefs'
import { ApolloServer } from 'apollo-server-micro'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
