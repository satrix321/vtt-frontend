import { Cta } from '@/components/page/cta/cta'
import { Column, Row } from '@/components/page/grid/grid'
import classNames from 'classnames'
import styles from './heroHighlight.module.scss'

type Props = {
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaHref?: string
  backgroundSrc?: string
  invertColors?: boolean
}

export const HeroHighlight: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <section className={classNames(styles['hero-highlight'], { [styles['invert-colors']]: props.invertColors })}>
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
