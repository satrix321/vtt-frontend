import styles from './textInput.module.scss'

type Props = {
  name?: string,
  label?: string,
  type?: string,
}

const TextInput: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={styles['form-component']}>
      <label className={styles.label}>
        {props.label}
        <input className={styles.input} name={props.name} type={props.type ? props.type : 'text'}></input>
      </label>
    </div>
  )
}

export default TextInput