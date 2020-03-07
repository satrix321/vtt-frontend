import axios from "axios"

export const requestGames = () => {
  return {
    type: 'REQUEST_GAMES',
    payload: async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/games')
        return response.data
      } catch (error) {
        return []
      }
    },
  }
}