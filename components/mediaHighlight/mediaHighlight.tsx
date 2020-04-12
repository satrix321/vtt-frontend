import './mediaHighlight.scss'
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
    <section className="media-highlight">
      <div className="media">
        <img src="/fantasy-2847724_1920.jpg" alt="game image" />
      </div>
      <div className="text">
        <div className="title">{props.title}</div>
        <div className="subtitle">{props.subtitle}</div>
        <div className="description">{props.description}</div>
        <div className="cta-container">
          <Cta href={props.ctaHref}>{props.ctaText}</Cta>
        </div>
      </div>
    </section>
  )
}

export default MediaHighlight