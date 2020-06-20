import styles from './quoteHighlight.module.scss'
import { Row, Column } from '../grid/grid'
import { Cta } from '../cta/cta'

type Props = {
  quote?: string,
  author?: string,
  ctaText?: string,
  ctaHref?: string,
}

export const QuoteHighlight: React.FunctionComponent<Props> = (props) => {
  return (
    <section className={styles['quote-highlight']}>
      <Row>
        <Column cols="12" sm="10" offset-sm="1" md="5" offset-md="1">
          <div className={styles.text}>
            <div className={styles.quote}>"{props.quote}"</div>
            <div className={styles.author}>{props.author}</div>
          </div>
        </Column>
        <Column cols="12" md="6">
          <div className={styles['cta-container']}>
            <Cta href={props.ctaHref}>{props.ctaText}</Cta>
          </div>
        </Column>
      </Row>
    </section>
  )
}