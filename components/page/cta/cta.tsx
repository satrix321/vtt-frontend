import classNames from 'classnames'
import styles from './cta.module.scss'
import Link from 'next/link'

type Props = {
  secondary?: boolean
  small?: boolean
  href?: string
}

export const Cta: React.FunctionComponent<Props> = (props) => {
  const classes: string[] = []
  classes.push(styles.cta)
  if (props.secondary) {
    classes.push(styles.secondary)
  } else {
    classes.push(styles.primary)
  }

  if (props.small) {
    classes.push(styles.small)
  }

  if (!props.href) {
    props.href = '#'
  }

  if (props.href?.startsWith('http') || props.href?.startsWith('https')) {
    return (
      <a className={classNames(classes)} href={props.href as string}>
        {props.children}
      </a>
    )
  } else {
    return (
      <Link href={props.href as string}>
        <a className={classNames(classes)}>{props.children}</a>
      </Link>
    )
  }
}
