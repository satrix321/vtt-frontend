import { AnyAction } from 'redux'

export default interface AppAction extends AnyAction {
  type: any
  payload: any
}