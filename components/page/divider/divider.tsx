import classNames from 'classnames'
import styles from './divider.module.scss'

type Props = {
  vertical?: boolean
}

export const Divider: React.FunctionComponent<Props> = (props: Props) => {
  return <hr className={classNames(styles.divider, { [styles.vertical]: props.vertical })}></hr>
}
