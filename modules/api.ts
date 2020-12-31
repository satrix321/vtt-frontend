import { LoginResponse, User } from '@/models/profile'
import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import axios from 'axios'

const apiBaseUrl = process.env.apiBaseUrl as string

const uploadLink = createUploadLink({ uri: apiBaseUrl })
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(uploadLink),
})

export type BackendApi = {
  register: (email: string, password: string, username?: string) => Promise<User>
  login: (email: string, password: string) => Promise<LoginResponse>
  autoLogin: (token: string) => Promise<LoginResponse>

  createGame: (gameName: string, description: string, gameImage: FileList | null) => Promise<boolean>
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

  createGame: async (gameName: string, description: string, gameImage: FileList | null): Promise<boolean> => {
    const mutation = gql`
      mutation($name: String!, $description: String, $file: Upload!) {
        createGame(name: $name, description: $description, file: $file) {
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
            name: gameName,
            description: description,
            file,
          },
        })

        console.log(result)
      } catch (e) {
        console.log('error!')
        console.log(e)
      }
    }

    return false
  },
}

export default api
