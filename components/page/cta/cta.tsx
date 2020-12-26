import classNames from 'classnames'
import Link from 'next/link'
import { createRipple } from '../../../componentUtils/ripple/ripple'
import styles from './cta.module.scss'

type Props = {
  secondary?: boolean
  small?: boolean
  href?: string
}

export const Cta: React.FunctionComponent<Props> = (props) => {
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    createRipple(event)
  }

  if (props.href?.startsWith('http') || props.href?.startsWith('https')) {
    return (
      <a
        className={classNames(styles.cta, {
          [styles.primary]: !props.secondary,
          [styles.secondary]: props.secondary,
          [styles.small]: props.small,
        })}
        href={props.href as string}
        onClick={onClick}
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
          onClick={onClick}
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
        onClick={onClick}
      >
        {props.children}
      </a>
    )
  }
}
