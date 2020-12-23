import classNames from 'classnames'
import styles from './button.module.scss'

type Props = {
  secondary?: boolean
  block?: boolean
  type?: 'submit' | 'reset' | 'button'
  small?: boolean
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FunctionComponent<Props> = (props: Props) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(event)
    }
  }

  return (
    <button
      className={classNames(styles.button, {
        [styles.primary]: !props.secondary,
        [styles.secondary]: props.secondary,
        [styles.block]: props.block,
        [styles.small]: props.small,
      })}
      type={props.type ? props.type : 'button'}
      onClick={onClick}
    >
      {props.children}
    </button>
  )
}
