import {
  validateRequired,
  validateRules,
  ValidationEmitter,
  ValidationRule,
  ValidationState,
} from '@/modules/validation'
import classNames from 'classnames'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './textArea.module.scss'

export enum ResizeType {
  None = 1,
  Horizontal,
  Vertical,
  Both,
}

type Props = {
  name: string
  label?: string
  value?: string
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  resize?: ResizeType
  required?: boolean
  rules?: ValidationRule[]
  validationEmitter?: ValidationEmitter
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea: React.FunctionComponent<Props> = (props: Props) => {
  const [isValid, setIsValid] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const textarea = useRef<HTMLTextAreaElement>(null)

  const validate = (value: string | number | string[] | undefined): ValidationState => {
    const requiredValidation = validateRequired(value, props.required)
    if (!requiredValidation.result) {
      setIsValid(false)
      setErrorMessage(requiredValidation.error)
      return { result: false, error: requiredValidation.error }
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
      const validationState = validate(textarea.current?.value)

      if (props.validationEmitter) {
        props.validationEmitter.updateState(props.name, {
          result: validationState.result,
          error: validationState.error,
        })
      }
    }

    props.validationEmitter?.subscribeToFormValidation(formValidation)

    return function cleanup() {
      props.validationEmitter?.unsubscribeToFormValidation(formValidation)
    }
  }, [props.validationEmitter, props.name, props.required, props.rules])

  const onBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    validate(event.target.value)

    if (props.validationEmitter) {
      props.validationEmitter.updateState(props.name, { result: isValid, error: errorMessage })
    }
  }

  return (
    <div className={styles['form-component']}>
      <label className={styles.label}>
        {props.label} {props.required && '*'}
        <textarea
          ref={textarea}
          className={classNames(styles.textarea, {
            [styles['resize-none']]: props.resize === ResizeType.None,
            [styles['resize-horizontal']]: props.resize === ResizeType.Horizontal,
            [styles['resize-vertical']]: props.resize === ResizeType.Vertical,
            [styles['resize-both']]: !props.resize || props.resize === ResizeType.Both,
            [styles['is-invalid']]: !isValid,
          })}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          style={{
            width: props.width,
            height: props.height,
            minWidth: props.minWidth,
            minHeight: props.minHeight,
          }}
          onBlur={onBlur}
        ></textarea>
        <p className={classNames(styles['error-message'], { [styles['is-visible']]: !isValid })}>{errorMessage}</p>
      </label>
    </div>
  )
}
