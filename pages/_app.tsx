import React, { FC } from 'react'
import { wrapper } from '../store/store'
import App, { AppProps, AppInitialProps, AppContext } from 'next/app'
import '../scss/global.scss'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(MyApp)