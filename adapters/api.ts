import axios from 'axios'
import { Game, User, LoginResponse } from '../models/profile'

const apiBaseUrl = process.env.apiBaseUrl as string

export type BackendApi = {
  register: (email: string, password: string, username?: string) => Promise<User>,
  login: (email: string, password: string) => Promise<LoginResponse>,
  autoLogin: (token: string) => Promise<LoginResponse>,

  getGames: (userId: number) => Promise<Game[]>,
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
  }
}

export default api