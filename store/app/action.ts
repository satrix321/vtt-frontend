import { AnyAction } from "redux"

export const useMockApi = (): AnyAction => {
  return {
    type: 'USE_MOCK_API',
  }
}

export const useDefaultApi = (): AnyAction => {
  return {
    type: 'USE_DEFAULT_API',
  }
}