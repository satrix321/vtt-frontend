import styles from './mediaHighlight.module.scss'
import Cta from '../cta/cta'

type Props = {
  title?: string,
  subtitle?: string,
  description?: string,
  ctaText?: string,
  ctaHref?: string,
}

const MediaHighlight: React.FunctionComponent<Props> = (props) => {
  return (
    <section className={styles['media-highlight']}>
      <div className={styles.media}>
        <img src="/fantasy-2847724_1920.jpg" alt="game image" />
      </div>
      <div className={styles.text}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.subtitle}>{props.subtitle}</div>
        <div className={styles.description}>{props.description}</div>
        <div className={styles['cta-container']}>
          <Cta href={props.ctaHref}>{props.ctaText}</Cta>
        </div>
      </div>
    </section>
  )
}

export default MediaHighlight