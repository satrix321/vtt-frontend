import { AppAction } from '../types'
import { Game } from '../../models/profile'
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
    case 'REQUEST_GAMES':
      return {
        ...state,
        games: action.payload,
      }

    case 'REGISTER':
      return {
        ...state,
      }
    case HYDRATE:
      return {...state, ...action.payload.profile }
    default:
      return state
  }
}

export default reducer