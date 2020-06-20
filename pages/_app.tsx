import React, { FC } from 'react'
import { Provider } from 'react-redux'
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper'
import { initStore } from '../store/store'
import '../scss/global.scss'
import AppAction from '../store/appAction'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps, store }: ReduxWrapperAppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }: any) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps: pageProps };
}

export default withRedux(initStore)(MyApp)