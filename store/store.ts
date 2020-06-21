import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import app from './app/reducer'
import profile from './profile/reducer'
import { MakeStore, Context, createWrapper } from 'next-redux-wrapper'
import AppAction from './appAction'
import { AppState } from './app/reducer'
import { ProfileState } from './profile/reducer'

type State = {
  app: AppState,
  profile: ProfileState
}

const makeStore: MakeStore<State, AppAction> = (context: Context) => {
  return createStore(
    combineReducers<State, AppAction>({
      app,
      profile,
    }),
    composeWithDevTools(applyMiddleware(
      thunk,
      promise,
    ))
  )
}

export const wrapper = createWrapper<State, AppAction>(makeStore, {debug: true});