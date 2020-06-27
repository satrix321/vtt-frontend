import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import app from './app/reducer'
import profile from './profile/reducer'
import alert from './alert/reducer'
import { MakeStore, Context, createWrapper } from 'next-redux-wrapper'
import { AppAction } from './types'
import { AppState } from './app/reducer'
import { ProfileState } from './profile/reducer'
import { AlertState } from './alert/reducer'

export type State = {
  app: AppState,
  profile: ProfileState,
  alert: AlertState,
}

const makeStore: MakeStore<State, AppAction> = (context: Context) => {
  return createStore(
    combineReducers<State, AppAction>({
      app,
      profile,
      alert,
    }),
    composeWithDevTools(applyMiddleware(
      thunk,
    ))
  )
}

export const wrapper = createWrapper<State, AppAction>(makeStore, {debug: true})