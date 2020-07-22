import { Game, User } from '../../models/profile'
import { Reducer, AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import { runInContext } from 'vm'

export type ProfileState = {
  isLogged: boolean,
  user: User | null,
  games: Game[],
}

const initialState: ProfileState = {
  isLogged: false,
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
    case 'AUTO_LOGIN':
      return {
        ...state,
        isLogged: true,
      }
    case 'LOGOUT':
      return {
        ...state,
        isLogged: false,
      }
    case HYDRATE:
      return {...state, ...action.payload.profile }
    default:
      return state
  }
}

export default reducer