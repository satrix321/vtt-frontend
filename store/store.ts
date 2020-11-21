import { Context, createWrapper, MakeStore } from 'next-redux-wrapper'
import { Action, applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import alert, { AlertState } from './alert/reducer'
import app, { AppState } from './app/reducer'
import profile, { ProfileState } from './profile/reducer'

export type State = {
  app: AppState
  profile: ProfileState
  alert: AlertState
}

const makeStore: MakeStore<State, Action> = (context: Context) => {
  return createStore(
    combineReducers<State, Action>({
      app,
      profile,
      alert,
    }),
    composeWithDevTools(applyMiddleware(thunk)),
  )
}

export const wrapper = createWrapper<State, Action>(makeStore, { debug: true })
