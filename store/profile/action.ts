import { MyThunkAction } from '../types'
import { showAlert } from '../alert/action'
import { AlertType } from '../alert/reducer'
import { User } from '../../models/profile'
import axios from 'axios'

export const requestGames = (userId: number): MyThunkAction => {
  return async (dispatch, getState) => {
    try {
      const games = await getState().app.api.getGames(userId)
      dispatch({
        type: 'REQUEST_GAMES',
        payload: games,
      })
    } catch (e) {
      dispatch({
        type: 'REQUEST_GAMES',
        payload: [],
      })
      dispatch(showAlert(AlertType.Error, e.message))
    }
  }
}

export const register = (email: string, password: string, username?: string): MyThunkAction<Promise<User>> => {
  return async (_, getState) => {
    try {
      const user = await getState().app.api.register(email, password, username)
      return user
    } catch (e) {
      throw e
    }
  }
}

export const login = (email: string, password: string): MyThunkAction<Promise<User>> => {
  return async (dispatch, getState) => {
    try {
      const response = await getState().app.api.login(email, password)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.token
      localStorage.setItem('auth', 'Bearer ' + response.token)
      dispatch({
        type: 'LOGIN',
        payload: response.user,
      })
      return response.user
    } catch (e) {
      delete axios.defaults.headers.common['Authorization']
      throw e
    }
  }
}

export const autoLogin = (): MyThunkAction<Promise<User|undefined>> => {
  return async (dispatch, getState) => {
    const auth = window.localStorage.getItem('auth')

    if (auth) {
      try {
        axios.defaults.headers.common['Authorization'] = auth
        const response = await getState().app.api.autoLogin(auth.replace('Bearer ', ''))
        dispatch({
          type: 'AUTO_LOGIN',
          payload: response,
        })
        return response.user
      } catch (e) {
        delete axios.defaults.headers.common['Authorization']
        throw e
      }
    } else if (axios.defaults.headers.common['Authorization']) {
      delete axios.defaults.headers.common['Authorization']
    }
  }
}

export const logout = (): MyThunkAction => {
  return (dispatch) => {
    window.localStorage.removeItem('auth')
    delete axios.defaults.headers.common['Authorization']
    dispatch({ type: 'LOGOUT' })
  }
}