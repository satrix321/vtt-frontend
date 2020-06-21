import { AnyAction } from "redux"

export const useMockApi = () => {
  return {
    type: 'SET_API_TYPE',
    useMockApi: true,
  } as AnyAction
}

export const useDefaultApi = () => {
  return {
    type: 'SET_API_TYPE',
    useMockApi: false,
  } as AnyAction
}