import { Alert } from '@/components/page/alert/alert'
import { Header } from '@/components/page/header/header'
import '@/scss/global.scss'
import styles from '@/scss/page.module.scss'
import { autoLogin } from '@/store/profile/actions'
import { wrapper } from '@/store/store'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import 'focus-visible'
import { AnimatePresence } from 'framer-motion'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

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
