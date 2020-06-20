import styles from './heroHighlight.module.scss'
import classNames from 'classnames'
import { Row, Column } from '../grid/grid'
import { Cta } from '../cta/cta'

type Props = {
  title?: string,
  subtitle?: string,
  description?: string,
  ctaText?: string,
  ctaHref?: string,
  backgroundSrc?: string,
  invertColors?: boolean,
}

export const HeroHighlight: React.FunctionComponent<Props> = (props) => {
  let classes = []
  classes.push(styles['hero-highlight'])
  if (props.invertColors) {
    classes.push(styles['invert-colors'])
  }

  return (
    <section className={classNames(classes)}>
      <div className={styles['background-hero']}>
        <img src={props.backgroundSrc}></img>
      </div>
      <Row>
        <Column cols="12" md="6" offset-md="6">
          <div className={styles.text}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.subtitle}>{props.subtitle}</div>
            <div className={styles.description}>{props.description}</div>
            <Cta href={props.ctaHref}>{props.ctaText}</Cta>
          </div>
        </Column>
      </Row>
    </section>
  )
}