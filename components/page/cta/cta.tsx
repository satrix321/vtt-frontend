import classNames from 'classnames'
import styles from './cta.module.scss'
import Link from 'next/link'

type Props = {
  secondary?: boolean
  small?: boolean
  href?: string
}

export const Cta: React.FunctionComponent<Props> = (props) => {
  if (props.href?.startsWith('http') || props.href?.startsWith('https')) {
    return (
      <a
        className={classNames(styles.cta, {
          [styles.primary]: !props.secondary,
          [styles.secondary]: props.secondary,
          [styles.small]: props.small,
        })}
        href={props.href as string}
      >
        {props.children}
      </a>
    )
  } else if (props.href) {
    return (
      <Link href={props.href as string}>
        <a
          className={classNames(styles.cta, {
            [styles.primary]: !props.secondary,
            [styles.secondary]: props.secondary,
            [styles.small]: props.small,
          })}
        >
          {props.children}
        </a>
      </Link>
    )
  } else {
    return (
      <a
        className={classNames(styles.cta, {
          [styles.primary]: !props.secondary,
          [styles.secondary]: props.secondary,
          [styles.small]: props.small,
        })}
        href="#"
      >
        {props.children}
      </a>
    )
  }
}
