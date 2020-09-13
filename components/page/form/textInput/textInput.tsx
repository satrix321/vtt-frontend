import { ChangeEvent, useState, useEffect, useRef } from 'react'
import { ValidationRule, ValidationEmitter, ValidationState, validateRequired, validateEmail, validateRules } from '../validation'
import styles from './textInput.module.scss'
import classNames from 'classnames'

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

type Props = {
  name: string,
  label?: string,
  type?: string,
  value?: string | number | string[],
  required?: boolean,
  rules?: ValidationRule[],
  validationEmitter?: ValidationEmitter,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any,
}

export const TextInput: React.FunctionComponent<Props> = (props) => {
  const [isValid, setIsValid] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
  const input = useRef<HTMLInputElement>(null)

  const inputClasses = [styles.input]
  const errorClasses = [styles['error-message']]
  if (!isValid) {
    inputClasses.push(styles['is-invalid'])
    errorClasses.push(styles['is-visible'])
  }

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
        props.validationEmitter.updateState(props.name, { result: validationState.result, error: validationState.error })
      }
    }

    props.validationEmitter?.subscribeToFormValidation(formValidation)

    return function cleanup() {
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
          className={classNames(inputClasses)}
          name={props.name}
          type={props.type ? props.type : 'text'}
          value={props.value}
          onChange={props.onChange}
          onBlur={onBlur}
        ></input>
        <p className={classNames(errorClasses)}>{errorMessage}</p>
      </label>
    </div>
  )
}