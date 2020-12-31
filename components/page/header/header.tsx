import { Column, Container, Row } from '@/components/page/grid/grid'
import { State } from '@/store/store'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { MdMenu } from 'react-icons/md'
import { useSelector } from 'react-redux'
import styles from './header.module.scss'

export const Header: React.FunctionComponent = () => {
  const isLogged = useSelector((state: State) => state.profile.isLogged)
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>()

  return (
    <motion.header className={styles.header} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Container vCenter>
        <Row noMargins>
          <Column cols="2">
            <Link href="/">
              <a className={styles['logo-container']}>
                <img className={styles.logo} src="/logo-inverted.png" alt="logo" />
                <span className={styles['logo-text']}>VTT</span>
              </a>
            </Link>
          </Column>
          <Column cols="10">
            <div className={styles['hamburger-container']}>
              <a className={styles.hamburger} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                <MdMenu size="2em" />
              </a>
            </div>
            <nav className={classNames(styles.navigation, { [styles['mobile-open']]: mobileNavOpen })}>
              {!isLogged ? (
                <>
                  <HeaderItem href="/login">Login</HeaderItem>
                  <HeaderItem href="/register">Register</HeaderItem>
                </>
              ) : (
                <>
                  <HeaderItem href="/games">Games List</HeaderItem>
                  <HeaderItem href="/logout">Logout</HeaderItem>
                </>
              )}
            </nav>
          </Column>
        </Row>
      </Container>
    </motion.header>
  )
}

type HeaderItemProps = {
  href: string
  children: React.ReactNode
}

export const HeaderItem: React.FunctionComponent<HeaderItemProps> = (props: HeaderItemProps) => {
  return (
    <div className={styles['header-item']}>
      <Link href={props.href}>
        <a className={styles.link}>{props.children}</a>
      </Link>
    </div>
  )
}
