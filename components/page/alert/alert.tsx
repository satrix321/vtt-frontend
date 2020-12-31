import { AlertType } from '@/store/alert/reducer'
import { State } from '@/store/store'
import classNames from 'classnames'
import { IoMdCheckmarkCircle, IoMdCloseCircle, IoMdInformationCircle, IoMdWarning } from 'react-icons/io'
import { useSelector } from 'react-redux'
import styles from './alert.module.scss'

export const Alert: React.FunctionComponent = () => {
  const alert = useSelector((state: State) => state.alert)
  let icon: JSX.Element | undefined

  switch (alert.type) {
    case AlertType.Error:
      icon = <IoMdCloseCircle className={styles.icon} size="1.5em" />
      break
    case AlertType.Warning:
      icon = <IoMdWarning className={styles.icon} size="1.5em" />
      break
    case AlertType.Success:
      icon = <IoMdCheckmarkCircle className={styles.icon} size="1.5em" />
      break
    case AlertType.Regular:
    default:
      icon = <IoMdInformationCircle className={styles.icon} size="1.5em" />
      break
  }

  return (
    <div
      className={classNames(styles.alert, {
        [styles['is-visible']]: alert.isVisible,
        [styles['error-type']]: alert.type === AlertType.Error,
        [styles['warning-type']]: alert.type === AlertType.Warning,
        [styles['success-type']]: alert.type === AlertType.Success,
        [styles['regular-type']]: alert.type === AlertType.Regular,
      })}
      style={{ display: 'none' }}
    >
      {icon} {alert.message}
    </div>
  )
}
