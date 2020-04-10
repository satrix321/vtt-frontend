import classNames from 'classnames'
import './grid.scss'

export const Container: React.FunctionComponent = (props) => {
  return (
    <div className="container">
      {props.children}
    </div>
  )
}

export const Row: React.FunctionComponent = (props) => {
  return (
    <div className="row">
      {props.children}
    </div>
  )
}

type Props = {
  cols?: string,
  sm?: string, 
  md?: string,
  lg?: string,
  xl?: string,
  offset?: string,
  'offset-sm'?: string,
  'offset-md'?: string,
  'offset-lg'?: string,
  'offset-xl'?: string,
}

export const Column: React.FunctionComponent<Props> = (props) => {
  let classes = []
  if (props.cols) {
    classes.push('col-' + props.cols)
  }
  if (props.sm) {
    classes.push('col-sm-' + props.sm)
  }
  if (props.md) {
    classes.push('col-md-' + props.md)
  }
  if (props.lg) {
    classes.push('col-lg-' + props.lg)
  }
  if (props.xl) {
    classes.push('col-xl-' + props.xl)
  }
  if (props.offset) {
    classes.push('col-offset-' + props.offset)
  }
  if (props['offset-sm']) {
    classes.push('col-sm-offset-' + props['offset-sm'])
  }
  if (props['offset-md']) {
    classes.push('col-md-offset-' + props['offset-md'])
  }
  if (props['offset-lg']) {
    classes.push('col-lg-offset-' + props['offset-lg'])
  }
  if (props['offset-xl']) {
    classes.push('col-xl-offset-' + props['offset-xl'])
  }

  return (
    <div className={classNames(classes)}>
      {props.children}
    </div>
  )
}