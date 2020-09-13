import { ChangeEvent, useRef, useState, useEffect } from 'react'
import styles from './textArea.module.scss'
import classNames from 'classnames'
import { ValidationRule, ValidationEmitter, ValidationState, validateRules, validateRequired } from '../validation'

export enum ResizeType {
  None = 1,
  Horizontal,
  Vertical,
  Both
}

type Props = {
  name: string,
  label?: string,
  value?: string,
  width?: number,
  height?: number,
  minWidth?: number,
  minHeight?: number,
  resize?: ResizeType,
  required?: boolean,
  rules?: ValidationRule[],
  validationEmitter?: ValidationEmitter,
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => any
}

export const TextArea: React.FunctionComponent<Props> = (props) => {
  const [isValid, setIsValid] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
  const textarea = useRef<HTMLTextAreaElement>(null)

  const textareaClasses: string[] = [styles.textarea]
  if (props.resize) {
    switch (props.resize as ResizeType) {
      case ResizeType.None:
        textareaClasses.push(styles['resize-none'])
        break
      case ResizeType.Horizontal:
        textareaClasses.push(styles['resize-horizontal'])
        break
      case ResizeType.Vertical:
        textareaClasses.push(styles['resize-vertical'])
        break
      case ResizeType.Both:
        textareaClasses.push(styles['resize-both'])
        break
    }
  } else {
    textareaClasses.push(styles['resize-both'])
  }

  const errorClasses = [styles['error-message']]
  if (!isValid) {
    textareaClasses.push(styles['is-invalid'])
    errorClasses.push(styles['is-visible'])
  }

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
        props.validationEmitter.updateState(props.name, { result: validationState.result, error: validationState.error })
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
        {props.label}
        <textarea
          ref={textarea}
          className={classNames(textareaClasses)}
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
      </label>
    </div>
  )
}