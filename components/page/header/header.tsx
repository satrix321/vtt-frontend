import Link from 'next/link'
import { Container, Row, Column } from '../grid/grid'
import styles from './header.module.scss'

export const Header: React.FunctionComponent = (props) => {
  return (
    <header className={styles.header}>
      <Container vCenter>
        <Row noMargins>
          <Column cols="2">
            <div className={styles['logo-container']}>
              <img className={styles.logo} src="logo-inverted.png" alt="logo"/>
              <span className={styles['logo-text']}>VTT</span>
            </div>
          </Column>
          <Column cols="10">
            <nav className={styles.navigation}>
              <HeaderItem href="/inGame">Game View</HeaderItem>
              <HeaderItem href="/games">Games List</HeaderItem>
              <HeaderItem href="/">FAQ</HeaderItem>
              <HeaderItem href="/login">Login</HeaderItem>
              <HeaderItem href="/register">Register</HeaderItem>
            </nav>
          </Column>
        </Row>
      </Container>
    </header>
  )
}

type HeaderItemProps = {
  href: string
}

export const HeaderItem: React.FunctionComponent<HeaderItemProps> = (props) => {
  return (
    <div className={styles['header-item']}>
      <Link href={props.href}>
        <a className={styles.link}>{props.children}</a>
      </Link>
    </div>
  )
}