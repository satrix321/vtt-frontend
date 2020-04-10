export const useMockApi = () => {
  return {
    type: 'SET_API_TYPE',
    useMockApi: true,
  }
}

export const useDefaultApi = () => {
  return {
    type: 'SET_API_TYPE',
    useMockApi: false,
  }
}