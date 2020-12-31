import {
  validateEmail,
  validateRequired,
  validateRules,
  ValidationEmitter,
  ValidationRule,
  ValidationState,
} from '@/modules/validation'
import classNames from 'classnames'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './textInput.module.scss'

type Props = {
  name: string
  label?: string
  type?: string
  value?: string | number | string[]
  required?: boolean
  rules?: ValidationRule[]
  validationEmitter?: ValidationEmitter
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const TextInput: React.FunctionComponent<Props> = (props: Props) => {
  const [isValid, setIsValid] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const input = useRef<HTMLInputElement>(null)

  const validate = (value: string | number | string[] | undefined): ValidationState => {
    const requiredValidation = validateRequired(value, props.required)
    if (!requiredValidation.result) {
      setIsValid(false)
      setErrorMessage(requiredValidation.error)
      return { result: false, error: requiredValidation.error }
    }

    if (props.type === 'email') {
      const emailValidation = validateEmail(value)
      if (!emailValidation.result) {
        setIsValid(false)
        setErrorMessage(emailValidation.error)
        return { result: false, error: emailValidation.error }
      }
    }

    const rulesValidation = validateRules(value, props.rules)
    if (!rulesValidation.result) {
      setIsValid(false)
      setErrorMessage(rulesValidation.error)
      return { result: false, error: rulesValidation.error }
    }

    setIsValid(true)
    setErrorMessage(undefined)
    return { result: true }
  }

  useEffect(() => {
    const formValidation = () => {
      const validationState = validate(input.current?.value)

      if (props.validationEmitter) {
        props.validationEmitter.updateState(props.name, {
          result: validationState.result,
          error: validationState.error,
        })
      }
    }

    props.validationEmitter?.subscribeToFormValidation(formValidation)

    return () => {
      props.validationEmitter?.unsubscribeToFormValidation(formValidation)
    }
  }, [props.validationEmitter, props.name, props.type, props.required, props.rules])

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    validate(event.target.value)

    if (props.validationEmitter) {
      props.validationEmitter.updateState(props.name, { result: isValid, error: errorMessage })
    }
  }

  return (
    <div className={styles['form-component']}>
      <label className={styles.label}>
        {props.label} {props.required && '*'}
        <input
          ref={input}
          className={classNames(styles.input, { [styles['is-invalid']]: !isValid })}
          name={props.name}
          type={props.type ? props.type : 'text'}
          value={props.value}
          onChange={props.onChange}
          onBlur={onBlur}
        ></input>
        <p className={classNames(styles['error-message'], { [styles['is-visible']]: !isValid })}>{errorMessage}</p>
      </label>
    </div>
  )
}
