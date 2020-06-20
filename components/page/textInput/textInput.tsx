import { ChangeEvent } from 'react'
import styles from './textInput.module.scss'

type Props = {
  name?: string,
  label?: string,
  type?: string,
  value?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any
}

export const TextInput: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={styles['form-component']}>
      <label className={styles.label}>
        {props.label}
        <input
          className={styles.input}
          name={props.name}
          type={props.type ? props.type : 'text'}
          value={props.value}
          onChange={props.onChange}
        ></input>
      </label>
    </div>
  )
}