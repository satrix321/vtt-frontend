import { FormEvent, useState } from 'react'
import styles from './form.module.scss'
import React from 'react'
import { ValidationEmitter } from './validation'
import { TextInput } from './textInput/textInput'
import { TextArea } from './textArea/textArea'
import { FileInput } from './fileInput/fileInput'

type Props = {
  onSubmit?: (e: FormEvent) => void
  children: React.ReactNode
}

export const Form: React.FunctionComponent<Props> = (props: Props) => {
  const [validationEmitter] = useState(new ValidationEmitter())

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    const isValid = validationEmitter.validateForm()

    if (isValid && props.onSubmit) {
      props.onSubmit(e)
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          switch (child.type) {
            case TextInput:
            case TextArea:
            case FileInput:
              return React.cloneElement(child, { ...child.props, validationEmitter })
            default:
              return React.cloneElement(child, { ...child.props })
          }
        } else {
          return child
        }
      })}
    </form>
  )
}
