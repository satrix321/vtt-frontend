import classNames from 'classnames'
import styles from './cta.module.scss'

type Props = {
  secondary?: boolean,
  href?: string,
}

const Cta: React.FunctionComponent<Props> = (props) => {
  let classes = []
  classes.push(styles.cta)
  if (props.secondary) {
    classes.push(styles.secondary)
  } else {
    classes.push(styles.primary)
  }

  return (
    <a href={props.href} className={classNames(classes)}>{props.children}</a>
  )
}

export default Cta