import { Action } from 'redux'

export default class AppAction implements Action<string> {
  type: any
  payload: any
}