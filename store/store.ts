import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers, AnyAction, Action } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import app from './app/reducer'
import profile from './profile/reducer'
import alert from './alert/reducer'
import { MakeStore, Context, createWrapper } from 'next-redux-wrapper'
import { AppState } from './app/reducer'
import { ProfileState } from './profile/reducer'
import { AlertState } from './alert/reducer'

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
