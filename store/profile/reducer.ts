import AppAction from '../appAction'
import { Game } from '../../models/game'

type State = {
  games: Game[],
}

const initialState = {
  games: [],
} as State

export default (state: State = initialState, action: AppAction) => {
  switch (action.type) {
    case 'REQUEST_GAMES_PENDING':
      return {
        ...state,
        games: [],
      }
    case 'REQUEST_GAMES_REJECTED':
      return {
        ...state,
        games: [],
      }
    case 'REQUEST_GAMES_FULFILLED':
      return {
        ...state,
        games: action.payload,
      }
    default:
      return state
  }
}