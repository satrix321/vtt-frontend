import { FormEvent } from 'react'
import styles from './form.module.scss'

type Props = {
  onSubmit?: (e: FormEvent) => void
}

export const Form: React.FunctionComponent<Props> = (props) => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (props.onSubmit) {
      props.onSubmit(e)
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {props.children}
    </form>
  )
}