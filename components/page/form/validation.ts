import { EventEmitter, EventEmitterCallback } from '../../../modules/eventEmitter'

export type ValidationState = { result: boolean; error?: string }
export type ValidationRule = (data: string | number | string[] | undefined) => [boolean, string]

export class ValidationEmitter {
  eventEmitter: EventEmitter
  inputStates: Record<string, ValidationState>
  formState: boolean

  constructor() {
    this.eventEmitter = new EventEmitter()
    this.inputStates = {}
    this.formState = true
  }

  validateForm(): boolean {
    this.eventEmitter.dispatch('formValidation', null)
    return this.formState
  }

  updateState(elementName: string, state: ValidationState) {
    this.inputStates[elementName] = state

    let tempFormState = true
    for (const [_, { result: inputResult }] of Object.entries(this.inputStates)) {
      if (!inputResult) {
        tempFormState = false
      }
    }
    this.formState = tempFormState
  }

  subscribeToFormValidation(callback: EventEmitterCallback) {
    this.eventEmitter.subscribe('formValidation', callback)
  }
  unsubscribeToFormValidation(callback: EventEmitterCallback) {
    this.eventEmitter.unsubscribe('formValidation', callback)
  }
}

type FieldValue = string | number | string[] | undefined

export const validateRequired = (value: FieldValue, required: boolean | undefined) => {
  if (required) {
    if (!value) {
      return { result: false, error: 'Field is required' }
    }
  }
  return { result: true }
}

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const validateEmail = (value: FieldValue) => {
  if (typeof value === 'string') {
    if (!emailRegex.test(value)) {
      return { result: false, error: 'Invalid email format' }
    }
    return { result: true }
  } else {
    return { result: false, error: 'Invalid email format' }
  }
}

export const validateRules = (value: FieldValue, rules: ValidationRule[] | undefined) => {
  if (rules) {
    for (const rule of rules) {
      const [result, error] = rule(value)

      if (!result) {
        return { result: false, error: error }
      }
    }
  }
  return { result: true }
}
