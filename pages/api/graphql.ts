import { ApolloServer } from 'apollo-server-micro'
import { createContext, destroyContext } from '../../graphql/context'
import typeDefs from '../../graphql/typeDefs'
import resolvers from '../../graphql/resolvers'

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
