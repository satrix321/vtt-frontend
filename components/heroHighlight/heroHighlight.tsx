import './heroHighlight.scss'
import classNames from 'classnames'
import { Row, Column } from '../grid/grid'
import Cta from '../cta/cta'

type Props = {
  title?: string,
  subtitle?: string,
  description?: string,
  ctaText?: string,
  ctaHref?: string,
  backgroundSrc?: string,
  invertColors?: boolean,
}

const HeroHighlight: React.FunctionComponent<Props> = (props) => {
  let classes = []
  classes.push('hero-highlight')
  if (props.invertColors) {
    classes.push('invert-colors')
  }

  return (
    <section className={classNames(classes)}>
      <div className="background-hero">
        <img src={props.backgroundSrc}></img>
      </div>
      <Row>
        <Column cols="12" md="6" offset-md="6">
          <div className="text">
            <div className="title">{props.title}</div>
            <div className="subtitle">{props.subtitle}</div>
            <div className="description">{props.description}</div>
            <Cta href={props.ctaHref}>{props.ctaText}</Cta>
          </div>
        </Column>
      </Row>
    </section>
  )
}

export default HeroHighlight