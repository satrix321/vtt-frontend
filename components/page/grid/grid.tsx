import classNames from 'classnames'
import styles from './grid.module.scss'

type ContainerProps = {
  vCenter?: boolean
  children: React.ReactNode
}

export const Container: React.FunctionComponent<ContainerProps> = (props: ContainerProps) => {
  return (
    <div className={classNames(styles.container, { [styles['v-center']]: props.vCenter })}>
      <div>{props.children}</div>
    </div>
  )
}

type RowProps = {
  noMargins?: boolean
  center?: boolean
  children: React.ReactNode
}

export const Row: React.FunctionComponent<RowProps> = (props: RowProps) => {
  return (
    <div className={classNames(styles.row, { [styles['no-margins']]: props.noMargins, [styles.center]: props.center })}>
      {props.children}
    </div>
  )
}

type ColumnProps = {
  cols?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  offset?: string
  'offset-sm'?: string
  'offset-md'?: string
  'offset-lg'?: string
  'offset-xl'?: string
  children: React.ReactNode
}

export const Column: React.FunctionComponent<ColumnProps> = (props: ColumnProps) => {
  return (
    <div
      className={classNames(
        classNames({
          [styles['col-' + props.cols]]: props.cols,
          [styles['col-sm-' + props.sm]]: props.sm,
          [styles['col-md-' + props.md]]: props.md,
          [styles['col-lg-' + props.lg]]: props.lg,
          [styles['col-xl-' + props.xl]]: props.xl,
          [styles['col-offset-' + props.offset]]: props.offset,
          [styles['col-sm-offset-' + props['offset-sm']]]: props['offset-sm'],
          [styles['col-md-offset-' + props['offset-md']]]: props['offset-md'],
          [styles['col-lg-offset-' + props['offset-lg']]]: props['offset-lg'],
          [styles['col-xl-offset-' + props['offset-xl']]]: props['offset-xl'],
        }),
      )}
    >
      {props.children}
    </div>
  )
}
