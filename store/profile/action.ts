import { ThunkAction } from '../types'
import { showAlert } from '../alert/action'
import { AlertType } from '../alert/reducer'

export const requestGames = (): ThunkAction => {
  return async (dispatch, getState) => {
    try {
      const games = await getState().app.api.getGames()
      dispatch({
        type: 'REQUEST_GAMES',
        payload: games,
      })
    } catch (e) {
      console.error(e)
      dispatch({
        type: 'REQUEST_GAMES',
        payload: [],
      })
      dispatch(showAlert(AlertType.Error, e.message))
    }
  }
}

export const register = (email: string, password: string, username?: string): ThunkAction => {
  return async (dispatch, getState) => {
    try {
      const user = await getState().app.api.register(email, password, username)
      dispatch({
        type: 'REGISTER',
        payload: user,
      })
      return user
    } catch (e) {
      console.error(e)
      dispatch(showAlert(AlertType.Error, e.message))
    }
  }
}