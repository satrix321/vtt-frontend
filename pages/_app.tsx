import React, { FC, useEffect } from 'react'
import { wrapper } from '../store/store'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Alert } from '../components/page/alert/alert'
import { useDispatch } from 'react-redux'
import { autoLogin } from '../store/profile/action'
import { AnimatePresence } from 'framer-motion'
import styles from '../scss/page.module.scss'
import '../scss/global.scss'
import { Header } from '../components/page/header/header'

function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 })
  }
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

  return (
    <div className={styles.page}>
      <div style={{ display: router.route === '/inGame' ? 'none' : 'initial' }}>
        <Header/>
      </div>
      <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
        <Component {...pageProps} key={router.route}/>
      </AnimatePresence>
      <Alert/>
    </div>
  )
}

export default wrapper.withRedux(MyApp)