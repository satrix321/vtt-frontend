import { MyThunkAction } from '../types'
import { debounce } from '../../modules/utils'
import { AlertType } from './reducer'

const alertDuration = 3000
let hideAlertDebounced: (() => void) | null = null

export const showAlert = (type: AlertType, message: string): MyThunkAction => {
  return (dispatch) => {
    if (!hideAlertDebounced) {
      hideAlertDebounced = debounce(() => dispatch({
        type: 'HIDE_ALERT',
      }), alertDuration)
    }
  
    hideAlertDebounced()

    return dispatch({
      type: 'SHOW_ALERT',
      payload: {
        type,
        message,
      },
    })
  }
}

export const hideAlert = (): MyThunkAction => {
  return (dispatch) => dispatch({
    type: 'HIDE_ALERT',
    payload: null,
  })
}