import Link from 'next/link'
import { Container, Row, Column } from '../grid/grid'
import { useState } from 'react'
import classNames from 'classnames'
import { MdMenu } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { State } from '../../../store/store'
import styles from './header.module.scss'
import { motion } from 'framer-motion'

export const Header: React.FunctionComponent = () => {
  const isLogged = useSelector((state: State) => state.profile.isLogged)
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>()

  const navClasses = [styles.navigation]
  if (mobileNavOpen) {
    navClasses.push(styles['mobile-open'])
  }

  return (
    <motion.header className={styles.header} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
      <Container vCenter>
        <Row noMargins>
          <Column cols="2">
            <Link href="/">
              <div className={styles['logo-container']}>
                <img className={styles.logo} src="logo-inverted.png" alt="logo"/>    
                <span className={styles['logo-text']}>VTT</span>
              </div>
            </Link>
          </Column>
          <Column cols="10">
            <div className={styles['hamburger-container']}>
              <a className={styles.hamburger} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                <MdMenu size="2em"/>
              </a>
            </div>
            <nav className={classNames(navClasses)}>
              {!isLogged
                ? <>
                  <HeaderItem href="/login">Login</HeaderItem>
                  <HeaderItem href="/register">Register</HeaderItem>
                </>
                : <>
                  <HeaderItem href="/games">Games List</HeaderItem>
                  <HeaderItem href="/logout">Logout</HeaderItem>
                </>
              }
            </nav>
          </Column>
        </Row>
      </Container>
    </motion.header>
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