import { Reducer, AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import AppAction from '../appAction'

export type AppState = {
  useMockApi: boolean,
}

const initialState: AppState = {
  useMockApi: process.env.useMockApi as any,
}

const reducer: Reducer<AppState, AppAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_API_TYPE':
      return {
        ...state,
        useMockApi: action.useMockApi,
      }
    case HYDRATE:
      return {...state, ...action.payload.app }
    default:
      return state
  }
}

export default reducer