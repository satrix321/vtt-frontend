export const debounce = (callback: (...args: any) => any, timeout: number) => {
  let timeoutId: number | undefined
  return () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId)
    }
    timeoutId = window.setTimeout(callback, timeout)
  }
}