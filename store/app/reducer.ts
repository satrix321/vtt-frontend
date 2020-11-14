import { Reducer, AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import api, { BackendApi } from '../../modules/api'

export type AppState = {
  api: BackendApi
}

const initialState: AppState = {
  api: api,
}

const reducer: Reducer<AppState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.app }
    default:
      return state
  }
}

export default reducer
