import styles from './chip.module.scss'

const Chip: React.FunctionComponent = (props) => {
  return (
    <div className={styles.chip}>
      {props.children}
    </div>
  )
}

export default Chip