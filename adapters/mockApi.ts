import { BackendApi } from './api'
import { Game } from '../models/profile'

const mockApi: BackendApi = {
  register: async (email: string, password: string, username?: string): Promise<any> => {
    return 'success'
  },

  login: async(email: string, password: string): Promise<any> => {
    return 'success'
  },

  getGames: async (): Promise<Game[]> => {
    return [
      // {
      //   gameId: 1,
      //   name: 'First sample game',
      //   description: 'A short description about your game!',
      //   lastGameDate: '2020-10-10T00:00:00',
      //   nextGameDate: '2020-10-10T00:00:00',
      // } as Game,
      // {
      //   gameId: 2,
      //   name: 'Second sample game',
      //   description: 'A short description about your game!',
      //   lastGameDate: null,
      //   nextGameDate: null,
      // } as Game,
    ]
  }
}

export default mockApi