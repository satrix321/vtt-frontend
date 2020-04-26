import styles from './systemsHighlight.module.scss'

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
    <section className={styles['systems-highlight']}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.description}>{props.description}</div>
      <div className={styles['systems-container']}>
        {props.systems.map((system, index) => {
          return (
            <div className={styles.system} key={index}>
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