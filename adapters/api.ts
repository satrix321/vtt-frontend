import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import axios from 'axios'
import { Game, LoginResponse, User } from '../models/profile'

const apiBaseUrl = process.env.apiBaseUrl as string

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: apiBaseUrl }),
})

export type BackendApi = {
  register: (email: string, password: string, username?: string) => Promise<User>,
  login: (email: string, password: string) => Promise<LoginResponse>,
  autoLogin: (token: string) => Promise<LoginResponse>,

  getGames: (userId: number) => Promise<Game[]>,
  createGame: (gameName: string, description: string, gameImage: FileList | null) => Promise<boolean>,
}

const api: BackendApi = {
  

  register: async (email: string, password: string, username?: string): Promise<User> => {
    const registerQuery = `mutation {
      register(email: "${email}", password: "${password}", username: "${username}") {
        id
        email
        username
      }
    }`

    const response = await axios.post(apiBaseUrl, { query: registerQuery })

    if (!response.data.errors) {
      return response.data.data.register as User
    } else {
      throw new Error(response.data.errors[0].message)
    }
  },

  login: async (email: string, password: string): Promise<LoginResponse> => {
    const loginQuery = `mutation {
      login(email: "${email}", password: "${password}") {
        token
        user {
          id
          email
          username
        }
      }
    }`

    const response = await axios.post(apiBaseUrl, { query: loginQuery })

    if (!response.data.errors) {
      return response.data.data.login as LoginResponse
    } else {
      throw new Error(response.data.errors[0].message)
    }
  },

  autoLogin: async (token: string): Promise<LoginResponse> => {
    const autoLoginQuery = `mutation {
      autoLogin(token: "${token}") {
        id
        email
        username
      }
    }`

    const response = await axios.post(apiBaseUrl, { query: autoLoginQuery })

    if (!response.data.errors) {
      return response.data.data.autoLogin as LoginResponse
    } else {
      throw new Error(response.data.errors[0].message)
    }
  },

  getGames: async (userId: number): Promise<Game[]> => {
    const getGamesQuery = `query {
      listOfGames(userId: ${userId}) {
        id
        name
        ownerId
        description
        lastGameDate
        nextGameDate
        players {
          id
          username
        }
      }
    }`

    const response = await axios.post(apiBaseUrl, { query: getGamesQuery })

    if (!response.data.errors) {
      return response.data.data.listOfGames as Game[]
    } else {
      throw new Error(response.data.errors[0].message)
    }
  },

  createGame: async (gameName: string, description: string, gameImage: FileList | null): Promise<boolean> => {
    const mutation = gql`
      mutation($ownerId: ID!, $name: String!, $description: String, $file: Upload!) {
        createGame(ownerId: $ownerId, name: $name, description: $description, file: $file) {
          name
        }
      }
    `

    if (gameImage && gameImage.length) {
      const file = gameImage[0]
      console.log(file)

      try {
        const result = await apolloClient.mutate({
          mutation,
          variables: {
            ownerId: 0,
            name: gameName,
            description: description,
            file,
          }
        })

        console.log(result)
      } catch (e) {
        console.log('error!')
        console.log(e)
      }
    }

    return false
  }
}

export default api