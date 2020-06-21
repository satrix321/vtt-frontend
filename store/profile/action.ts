import AppAction from "../appAction"
import api from '../../adapters/api'
import mockApi from '../../adapters/mockApi'

export const requestGames = () => {
  return (dispatch: any, getState: any) => {
    return dispatch({
      type: 'REQUEST_GAMES',
      payload: {
        promise: getState().app.useMockApi ? mockApi.getGames() : api.getGames()
      }
    } as AppAction)
  }
}

// export const register = () => {
//   return (dispatch: any, getState: any) => {
//     return dispatch({
//       type: 'REGISTER',
//       payload: {
//         promise: getState().app.useMockApi ? mockApi.register() : api.register()
//       }
//     } as AppAction)
//   }
// }