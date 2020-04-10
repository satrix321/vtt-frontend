import React from 'react'
import { Provider } from 'react-redux'
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper'
import { initStore } from '../store/store'
import '../scss/global.scss'

const MyApp = ({ Component, pageProps, store }: ReduxWrapperAppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default withRedux(initStore)(MyApp)