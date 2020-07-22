import classNames from 'classnames'
import { connect } from 'react-redux'
import { State } from '../../../store/store'
import { AlertState, AlertType } from '../../../store/alert/reducer'
import { IoMdCloseCircle } from 'react-icons/io'
import { IoMdWarning } from 'react-icons/io'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { IoMdInformationCircle } from 'react-icons/io'
import styles from './alert.module.scss'

const AlertComponent: React.FunctionComponent<AlertState> = (alert) => {
  let classes: string[] = []
  let icon: JSX.Element | undefined;
  classes.push(styles.alert)
  if (alert.isVisible) {
    classes.push(styles.visible)
  }
  switch (alert.type) {
    case AlertType.Error:
      classes.push(styles['error-type'])
      icon = <IoMdCloseCircle className={styles.icon} size="1.5rem"/>
      break;
    case AlertType.Warning:
      classes.push(styles['warning-type'])
      icon = <IoMdWarning className={styles.icon} size="1.5rem"/>
      break;
    case AlertType.Success:
      classes.push(styles['success-type'])
      icon = <IoMdCheckmarkCircle className={styles.icon} size="1.5rem"/>
      break;
    case AlertType.Regular:
    default:
      classes.push(styles['regular-type'])
      icon = <IoMdInformationCircle className={styles.icon} size="1.5rem"/>
      break;
  }

  return (
    <div className={classNames(classes)}>
      {icon} {alert.message}
    </div>
  )
}

export const Alert = connect((state: State) => state.alert)(AlertComponent)