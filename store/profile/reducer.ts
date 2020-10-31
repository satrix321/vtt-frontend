import { Game, User } from '../../models/profile'
import { Reducer, AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

export type ProfileState = {
  isLogged: boolean | null
  user: User | null
  games: Game[]
}

const initialState: ProfileState = {
  isLogged: null,
  user: null,
  games: [],
}

const reducer: Reducer<ProfileState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_GAMES':
      return {
        ...state,
        games: action.payload,
      }
    case 'LOGIN':
      return {
        ...state,
        isLogged: true,
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        isLogged: false,
        user: null,
      }
    case HYDRATE:
      return { ...state, ...action.payload.profile }
    default:
      return state
  }
}

export default reducer
