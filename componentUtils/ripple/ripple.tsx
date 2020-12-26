import styles from './ripple.module.scss'

export const createRipple = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
  const target = event.currentTarget
  const circle = document.createElement('span')
  const diameter = Math.max(target.clientWidth, target.clientHeight)
  const radius = diameter / 2
  const { left: targetLeft, top: targetTop } = target.getBoundingClientRect()

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - (targetLeft + radius)}px`
  circle.style.top = `${event.clientY - (targetTop + radius)}px`
  circle.classList.add(styles.ripple)

  const ripple = target.querySelector(`.${styles.ripple}`)

  if (ripple) {
    ripple.remove()
  }

  target.appendChild(circle)
}
