import classNames from 'classnames'
import { IoMdCheckmarkCircle, IoMdCloseCircle, IoMdInformationCircle, IoMdWarning } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { AlertType } from '../../../store/alert/reducer'
import { State } from '../../../store/store'
import styles from './alert.module.scss'

export const Alert: React.FunctionComponent = () => {
  const alert = useSelector((state: State) => state.alert)
  const classes: string[] = []
  let icon: JSX.Element | undefined

  classes.push(styles.alert)
  if (alert.isVisible) {
    classes.push(styles.visible)
  }
  switch (alert.type) {
    case AlertType.Error:
      classes.push(styles['error-type'])
      icon = <IoMdCloseCircle className={styles.icon} size="1.5em" />
      break
    case AlertType.Warning:
      classes.push(styles['warning-type'])
      icon = <IoMdWarning className={styles.icon} size="1.5em" />
      break
    case AlertType.Success:
      classes.push(styles['success-type'])
      icon = <IoMdCheckmarkCircle className={styles.icon} size="1.5em" />
      break
    case AlertType.Regular:
    default:
      classes.push(styles['regular-type'])
      icon = <IoMdInformationCircle className={styles.icon} size="1.5em" />
      break
  }

  return (
    <div className={classNames(classes)} style={{ display: 'none' }}>
      {icon} {alert.message}
    </div>
  )
}
