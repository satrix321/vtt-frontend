import { AnyAction } from 'redux'
import { ThunkAction as OriginalThunkAction } from 'redux-thunk'
import { State } from './store'

export interface AppAction extends AnyAction {
  type: string
  payload?: any,
}

export type ThunkAction = OriginalThunkAction<void, State, unknown, AppAction>