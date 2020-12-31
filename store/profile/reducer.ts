import { User } from '@/models/profile'
import { GameGetPayload } from '@prisma/client'
import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction, Reducer } from 'redux'

type Game = GameGetPayload<{
  include: {
    players: true
    owner: true
  }
}>

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
    case 'GET_GAMES':
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
