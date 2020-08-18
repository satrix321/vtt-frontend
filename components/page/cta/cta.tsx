import classNames from 'classnames'
import styles from './cta.module.scss'

type Props = {
  secondary?: boolean,
  small?: boolean,
  href?: string,
}

export const Cta: React.FunctionComponent<Props> = (props) => {
  let classes: string[] = []
  classes.push(styles.cta)
  if (props.secondary) {
    classes.push(styles.secondary)
  } else {
    classes.push(styles.primary)
  }

  if (props.small) {
    classes.push(styles.small)
  }

  return (
    <a href={props.href} className={classNames(classes)}>{props.children}</a>
  )
}