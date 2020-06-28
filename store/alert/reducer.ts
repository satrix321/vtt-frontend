import { Reducer, AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

export enum AlertType {
  Error,
  Warning,
  Success,
  Regular,
}

export type AlertState = {
  isVisible: boolean,
  type: AlertType,
  message: string,
}

const initialState: AlertState = {
  isVisible: false,
  type: AlertType.Regular,
  message: '',
}

const reducer: Reducer<AlertState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        isVisible: true,
        type: action.payload.type,
        message: action.payload.message,
      }
    case 'HIDE_ALERT':
      return {
        ...state,
        isVisible: false,
      }
    case HYDRATE:
      return {...state, ...action.payload.app }
    default:
      return state
  }
}

export default reducer