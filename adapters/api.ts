import axios from 'axios'
import { Game } from '../models/game'

const api = {
  getGames: async (): Promise<Game[]> => {
    const response = await axios.get('http://localhost:8080/api/games')
    return response.data as Game[]
  }
}

export default api