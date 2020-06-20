import styles from './form.module.scss'
import { FormEvent } from 'react'

type Props = {
  onSubmit?: (e: FormEvent) => void
}

export const Form: React.FunctionComponent<Props> = (props) => {
  if (!props.onSubmit) {
    props.onSubmit = () => {}
  }

  return (
    <form className={styles.form} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  )
}