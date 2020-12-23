import styles from './modal.module.scss'
import classNames from 'classnames'
import { useCallback, useEffect, useRef } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  width?: number
  height?: number
  persistent?: boolean
}

export const Modal: React.FunctionComponent<Props> = (props: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const listenerRef = useRef<boolean>(false)
  const persistenceCallback = useCallback((e: MouseEvent) => {
    if (overlayRef.current === e.target) {
      props.onClose()
    }
  }, [])

  useEffect(() => {
    if (props.open && !props.persistent) {
      window.addEventListener('click', persistenceCallback)
      listenerRef.current = true

      return () => {
        window.removeEventListener('click', persistenceCallback)
      }
    } else if (listenerRef.current) {
      window.removeEventListener('click', persistenceCallback)
    }
  }, [props.open, props.persistent])

  return (
    <>
      <div ref={overlayRef} className={classNames(styles.overlay, { [styles['is-visible']]: props.open })}></div>
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
