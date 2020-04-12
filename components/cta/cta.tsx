import classNames from 'classnames'
import './cta.scss'

type Props = {
  secondary?: boolean,
  href?: string,
}

const Cta: React.FunctionComponent<Props> = (props) => {
  let classes = []
  classes.push('cta');
  if (props.secondary) {
    classes.push('secondary')
  } else {
    classes.push('primary')
  }

  return (
    <a href={props.href} className={classNames(classes)}>{props.children}</a>
  )
}

export default Cta