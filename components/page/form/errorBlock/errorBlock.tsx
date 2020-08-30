import styles from './errorBlock.module.scss'

type Props = {
  message: string,
}

export const ErrorBlock: React.FunctionComponent<Props> = (props) => {
  if (props.message) {
    return (
      <div className={styles['error-block']}>
        {props.message}
      </div>
    )
  } else {
    return null
  }
}