import { Reducer, AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import mockApi from '../../adapters/mockApi'
import api, { BackendApi } from '../../adapters/api'

export type AppState = {
  api: BackendApi,
}

const initialState: AppState = {
  api: process.env.useMockApi ? mockApi : api,
}

const reducer: Reducer<AppState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'USE_MOCK_API':
      return {
        ...state,
        api: mockApi,
      }
    case 'USE_DEFAULT_API':
      return {
        ...state,
        api: api,
      }
    case HYDRATE:
      return {...state, ...action.payload.app }
    default:
      return state
  }
}

export default reducer