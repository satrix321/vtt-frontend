import axios from 'axios'
import { Game, User } from '../models/profile'

const apiBaseUrl = process.env.apiBaseUrl as string

export type BackendApi = {
  register: (email: string, password: string, username?: string) => Promise<User>,
  login: (email: string, password: string) => Promise<any>,
  getGames: () => Promise<Game[]>,
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

  login: async(email: string, password: string): Promise<any> => {
    return 'success'
  },

  getGames: async (): Promise<Game[]> => {
    const response = await axios.get('http://localhost:8080/api/games')
    return response.data as Game[]
  }
}

export default api