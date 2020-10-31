import { AnyAction } from 'redux'
import { ThunkAction as OriginalThunkAction, ThunkDispatch } from 'redux-thunk'
import { State } from './store'

export type MyThunkAction<R = any> = OriginalThunkAction<R, State, unknown, AnyAction>
export type MyThunkDispatch = ThunkDispatch<State, unknown, AnyAction>
