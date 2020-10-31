import styles from './chip.module.scss'

type Props = {
  children: React.ReactNode
}

export const Chip: React.FunctionComponent<Props> = (props: Props) => {
  return <div className={styles.chip}>{props.children}</div>
}
