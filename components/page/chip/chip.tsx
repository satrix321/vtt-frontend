import styles from './chip.module.scss'

export const Chip: React.FunctionComponent = (props) => {
  return (
    <div className={styles.chip}>
      {props.children}
    </div>
  )
}