import { Alert } from '@/components/page/alert/alert'
import { Header } from '@/components/page/header/header'
import '@/scss/global.scss'
import styles from '@/scss/page.module.scss'
import { wrapper } from '@/store/store'
import { ApolloClient, ApolloProvider, gql, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import 'focus-visible'
import { AnimatePresence } from 'framer-motion'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const AUTO_LOGIN = gql`
  mutation AutoLogin($token: String!) {
    autoLogin(token: $token) {
      id
      email
      username
    }
  }
`

function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 })
  }
}

const apiBaseUrl = process.env.apiBaseUrl as string
const uploadLink = createUploadLink({ uri: apiBaseUrl })
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(uploadLink),
})

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const token = window.localStorage.getItem('token')

    if (token) {
      try {
        ;(async () => {
          const response = await apolloClient.mutate({ mutation: AUTO_LOGIN, variables: { token } })
          if (response.data.autoLogin) {
            dispatch({
              type: 'LOGIN',
              payload: response.data.autoLogin,
            })
          } else {
            dispatch({ type: 'LOGOUT' })
          }
        })()
      } catch (e) {
        console.error(e)
        dispatch({ type: 'LOGOUT' })
      }
    } else {
      dispatch({ type: 'LOGOUT' })
    }
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
