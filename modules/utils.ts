export const debounce = (callback: (...args: unknown[]) => unknown, timeout: number): (() => void) => {
  let timeoutId: number | undefined
  return () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId)
    }
    timeoutId = window.setTimeout(callback, timeout)
  }
}
