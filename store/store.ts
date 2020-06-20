import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import app from './app/reducer'
import profile from './profile/reducer'
import { MakeStore, Context, createWrapper } from 'next-redux-wrapper'

// create a makeStore function
const makeStore: MakeStore<any> = (context: Context) => {
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

// export an assembled wrapper
export const wrapper = createWrapper<any>(makeStore, {debug: true});