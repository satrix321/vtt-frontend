import { ValidationEmitter } from '@/modules/validation'
import React, { FormEvent, useState } from 'react'
import { FileInput } from './fileInput/fileInput'
import styles from './form.module.scss'
import { TextArea } from './textArea/textArea'
import { TextInput } from './textInput/textInput'

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
