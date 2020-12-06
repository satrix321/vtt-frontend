import styles from './box.module.scss'

type BoxProps = {
  children: React.ReactNode
}

type BoxTitleProps = {
  children: React.ReactNode
}

type BoxContentProps = {
  children: React.ReactNode
}

type BoxFooterProps = {
  children: React.ReactNode
}

export const Box: React.FunctionComponent<BoxProps> = (props: BoxProps) => {
  return <div className={styles.box}>{props.children}</div>
}

export const BoxTitle: React.FC<BoxTitleProps> = (props: BoxTitleProps) => {
  return <div className={styles.title}>{props.children}</div>
}

export const BoxContent: React.FC<BoxContentProps> = (props: BoxContentProps) => {
  return <div className={styles.content}>{props.children}</div>
}

export const BoxFooter: React.FC<BoxFooterProps> = (props: BoxFooterProps) => {
  return <div className={styles.footer}>{props.children}</div>
}
