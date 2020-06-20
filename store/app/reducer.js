import api from '../../adapters/api'
import mockApi from '../../adapters/mockApi'

const initialState = {
  api: process.env.useMockApi ? mockApi : api,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_API_TYPE':
      return {
        ...state,
        api: action.useMockApi ? mockApi : api,
      }
    case 'HYDRATE':
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return {...state, ...action.payload};
    default:
      return state
  }
}