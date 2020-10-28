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

export const SystemsHighlight: React.FunctionComponent<Props> = (props) => {
  return (
    <section className={styles['systems-highlight']}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.description}>{props.description}</div>
      <div className={styles['systems-container']}>
        {props.systems.map((system, index) => {
          return (
            <div className={styles.system} key={index}>
              <a className={styles['system__link']} href={system.imageHref}>
                <img className={styles['system__img']} src={system.imageSrc} alt="system image"/>
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}