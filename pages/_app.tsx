import React, { FC, useEffect } from 'react'
import { wrapper } from '../store/store'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Alert } from '../components/page/alert/alert'
import { useDispatch } from 'react-redux'
import { autoLogin } from '../store/profile/actions'
import { AnimatePresence } from 'framer-motion'
import styles from '../scss/page.module.scss'
import '../scss/global.scss'
import { Header } from '../components/page/header/header'
import 'focus-visible'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 })
  }
}

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.apiBaseUrl as string,
})

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

  return (
    <ApolloProvider client={apolloClient}>
      <div className={styles.page}>
        <div style={{ display: router.route === '/inGame' ? 'none' : 'initial' }}>
          <Header />
        </div>
        <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
        <Alert />
      </div>
    </ApolloProvider>
  )
}

export default wrapper.withRedux(MyApp)
