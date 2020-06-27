import { AppAction } from "../types"

export const useMockApi = (): AppAction => {
  return {
    type: 'USE_MOCK_API',
  }
}

export const useDefaultApi = (): AppAction => {
  return {
    type: 'USE_DEFAULT_API',
  }
}