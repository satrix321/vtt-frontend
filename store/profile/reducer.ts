import { User } from '@/models/profile'
import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction, Reducer } from 'redux'

export type ProfileState = {
  isLogged: boolean | null
  user: User | null
}

const initialState: ProfileState = {
  isLogged: null,
  user: null,
}

const reducer: Reducer<ProfileState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
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
