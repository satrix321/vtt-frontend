import classNames from 'classnames'
import styles from './grid.module.scss'

type ContainerProps = {
  vCenter?: boolean
  children: React.ReactNode
}

export const Container: React.FunctionComponent<ContainerProps> = (props: ContainerProps) => {
  const classes: string[] = [styles.container]
  if (props.vCenter) {
    classes.push(styles['v-center'])
  }

  return (
    <div className={classNames(classes)}>
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
  const classes: string[] = [styles.row]
  if (props.noMargins) {
    classes.push(styles['no-margins'])
  }
  if (props.center) {
    classes.push(styles.center)
  }

  return <div className={classNames(classes)}>{props.children}</div>
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
  const classes: string[] = []
  if (props.cols) {
    classes.push(styles['col-' + props.cols])
  }
  if (props.sm) {
    classes.push(styles['col-sm-' + props.sm])
  }
  if (props.md) {
    classes.push(styles['col-md-' + props.md])
  }
  if (props.lg) {
    classes.push(styles['col-lg-' + props.lg])
  }
  if (props.xl) {
    classes.push(styles['col-xl-' + props.xl])
  }
  if (props.offset) {
    classes.push(styles['col-offset-' + props.offset])
  }
  if (props['offset-sm']) {
    classes.push(styles['col-sm-offset-' + props['offset-sm']])
  }
  if (props['offset-md']) {
    classes.push(styles['col-md-offset-' + props['offset-md']])
  }
  if (props['offset-lg']) {
    classes.push(styles['col-lg-offset-' + props['offset-lg']])
  }
  if (props['offset-xl']) {
    classes.push(styles['col-xl-offset-' + props['offset-xl']])
  }

  return <div className={classNames(classes)}>{props.children}</div>
}
