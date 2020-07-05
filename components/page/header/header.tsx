import Link from 'next/link'
import { Container, Row, Column } from '../grid/grid'
import styles from './header.module.scss'
import { useState } from 'react'
import classNames from 'classnames'
import { MdMenu } from 'react-icons/md'

export const Header: React.FunctionComponent = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>()

  const navClasses = [styles.navigation]
  if (mobileNavOpen) {
    navClasses.push(styles['mobile-open'])
  }

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
            <div className={styles['hamburger-container']}>
              <a className={styles.hamburger} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                <MdMenu size="2rem"/>
              </a>
            </div>
            <nav className={classNames(navClasses)}>
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