import classNames from 'classnames'
import styles from './button.module.scss'

type Props = {
  secondary?: boolean,
  block?: boolean,
  type?: 'submit' | 'reset' | 'button',
}

export const Button: React.FunctionComponent<Props> = (props) => {
  let classes = []
  classes.push(styles.button)
  if (props.secondary) {
    classes.push(styles.secondary)
  } else {
    classes.push(styles.primary)
  }
  if (props.block) {
    classes.push(styles.block)
  }

  return (
    <button className={classNames(classes)} type={props.type ? props.type : 'button'}>
      {props.children}
    </button>
  )
}