import AppAction from "../appAction"

export const requestGames = () => {
  return (dispatch: any, getState: any) => {
    return dispatch({
      type: 'REQUEST_GAMES',
      payload: {
        promise: getState().app.api.getGames()
      }
    } as AppAction)
  }
}

export const register = () => {
  return (dispatch: any, getState: any) => {
    return dispatch({
      type: 'REGISTER',
      payload: {
        promise: getState().app.api.register()
      }
    } as AppAction)
  }
}