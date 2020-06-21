import AppAction from '../appAction'
import { Game } from '../../models/game'
import { Reducer } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

export type ProfileState = {
  games: Game[],
}

const initialState: ProfileState = {
  games: [],
}

const reducer: Reducer<ProfileState, AppAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_GAMES_PENDING':
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

    case 'REGISTER_PENDING':
    case 'REGISTER_REJECTED':
      return {
        ...state,
        token: '',
      }
    case 'REGISTER_FULFILLED':
      return {
        ...state,
        token: action.payload,
      }
    case HYDRATE:
      return {...state, ...action.payload.profile }
    default:
      return state
  }
}

export default reducer