import './quoteHighlight.scss'
import { Row, Column } from '../grid/grid'
import Cta from '../cta/cta'

type Props = {
  quote?: string,
  author?: string,
  ctaText?: string,
  ctaHref?: string,
}

const QuoteHighlight: React.FunctionComponent<Props> = (props) => {
  return (
    <section className="quote-highlight">
      <Row>
        <Column cols="10" offset="1" md="5" offset-md="1">
          <div className="text">
            <div className="quote">"{props.quote}"</div>
            <div className="author">{props.author}</div>
          </div>
        </Column>
        <Column cols="12" md="6">
          <div className="cta-container">
            <Cta href={props.ctaHref}>{props.ctaText}</Cta>
          </div>
        </Column>
      </Row>
    </section>
  )
}

export default QuoteHighlight