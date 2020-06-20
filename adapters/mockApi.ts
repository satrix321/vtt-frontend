import { Game } from '../models/game'

const mockApi = {
  register: async (email: string, password: string): Promise<void> => {

  },

  login: async(email: string, password: string): Promise<void> => {

  },

  getGames: async (): Promise<Game[]> => {
    return [
      {
        gameId: 1,
        name: 'First sample game',
        description: 'A short description about your game!',
        lastGameDate: '2020-10-10T00:00:00',
        nextGameDate: '2020-10-10T00:00:00',
      } as Game,
      {
        gameId: 2,
        name: 'Second sample game',
        description: 'A short description about your game!',
        lastGameDate: null,
        nextGameDate: null,
      } as Game,
    ]
  }
}

export default mockApi