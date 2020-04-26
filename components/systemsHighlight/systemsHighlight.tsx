import './systemsHighlight.scss'

type Props = {
  title?: string,
  description?: string,
  systems: System[],
}

type System = {
  imageSrc: string,
  imageHref?: string,
}

const SystemsHighlight: React.FunctionComponent<Props> = (props) => {
  return (
    <section className="systems-highlight">
      <div className="title">{props.title}</div>
      <div className="description">{props.description}</div>
      <div className="systems-container">
        {props.systems.map((system, index) => {
          return (
            <div className="system" key={index}>
              <a href={system.imageHref}>
                <img src={system.imageSrc} alt="system image"/>
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SystemsHighlight