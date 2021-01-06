import { gql } from 'apollo-server-micro'

export default gql`
  type Query {
    user(id: ID!): User
    currentUser: User!

    game(id: ID!): Game
    games(userId: ID!): [Game!]

    roll(equation: String!, verbose: Boolean): Roll!
  }

  type Mutation {
    register(email: String!, password: String!, username: String!): User!
    login(email: String!, password: String!): LoginResponse!
    autoLogin(token: String!): User

    createGame(name: String!, description: String, file: Upload!): Game!
    updateGame(game: GameInput!): Game!
    deleteGame(id: ID!): Game!
    addPlayerToGame(gameId: ID!, userId: ID!): Game!
    removePlayerFromGame(gameId: ID!, userId: ID!): Game!
  }

  type Result {
    result: Boolean!
    error: String
  }

  type User {
    id: ID!
    email: String!
    username: String
    ownedGames: [Game!]
    games: [Game!]
  }

  type Game {
    id: ID!
    owner: User!
    ownerId: ID!
    name: String!
    description: String
    lastGameDate: String
    nextGameDate: String
    backgroundUrl: String
    players: [User!]
  }

  input GameInput {
    id: ID!
    name: String!
    description: String
    lastGameDate: String
    nextGameDate: String
    backgroundUrl: String
  }

  type LoginResponse {
    token: String
    user: User
  }

  type Roll {
    equation: String!
    result: String!
    tokens: [Token!]
  }

  type Token {
    token: String!
    isRoll: Boolean!
    rollResults: [String!]
  }
`
