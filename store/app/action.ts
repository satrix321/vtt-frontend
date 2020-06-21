import { AnyAction } from "redux"

export const useMockApi = (): AnyAction => {
  return {
    type: 'SET_API_TYPE',
    useMockApi: true,
  }
}

export const useDefaultApi = (): AnyAction => {
  return {
    type: 'SET_API_TYPE',
    useMockApi: false,
  }
}