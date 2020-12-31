import { User } from '@/models/profile'
import { MyThunkAction } from '@/store/types'
import axios from 'axios'

export const createGame = (gameName: string, description: string, gameImage: FileList | null): MyThunkAction => {
  return async (dispatch, getState) => {
    try {
      await getState().app.api.createGame(gameName, description, gameImage)
    } catch (e) {
      throw e
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
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`
      localStorage.setItem('token', response.token)
      dispatch({
        type: 'LOGIN',
        payload: response.user,
      })
      return response.user
    } catch (e) {
      dispatch({ type: 'LOGOUT' })
      delete axios.defaults.headers.common['Authorization']
      throw e
    }
  }
}

export const autoLogin = (): MyThunkAction<Promise<User | undefined>> => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem('token')

    if (token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const response = await getState().app.api.autoLogin(token)
        dispatch({
          type: 'LOGIN',
          payload: response,
        })
        return response.user
      } catch (e) {
        dispatch({ type: 'LOGOUT' })
        delete axios.defaults.headers.common['Authorization']
        throw e
      }
    } else {
      dispatch({ type: 'LOGOUT' })
      delete axios.defaults.headers.common['Authorization']
    }
  }
}

export const logout = (): MyThunkAction => {
  return (dispatch) => {
    window.localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    dispatch({ type: 'LOGOUT' })
  }
}
