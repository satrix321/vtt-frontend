import axios from 'axios'
import { Game } from '../models/game'

const api = {
  register: async (email: string, password: string): Promise<any> => {
    return 'success'
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