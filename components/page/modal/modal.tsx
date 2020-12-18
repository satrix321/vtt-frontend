import styles from './modal.module.scss'
import classNames from 'classnames'

type Props = {
  open?: boolean
  children: React.ReactNode
  width?: number
  height?: number
}

export const Modal: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <div className={classNames(styles.overlay, { [styles['is-visible']]: props.open })}></div>
      <dialog
        style={{
          width: props.width ? props.width : 'max-content',
          height: props.height ? props.height : 'max-content',
        }}
        className={classNames(styles.modal, { [styles['is-visible']]: props.open })}
        open={!!props.open}
      >
        {props.children}
      </dialog>
    </>
  )
}
