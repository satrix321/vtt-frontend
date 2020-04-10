import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import app from './app/reducer'
import profile from './profile/reducer'

export const initStore = () => {
  return createStore(
    combineReducers({
      app,
      profile,
    }),
    composeWithDevTools(applyMiddleware(
      thunk,
      promise,
    ))
  )
}