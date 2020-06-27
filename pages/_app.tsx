import React, { FC } from 'react'
import { wrapper } from '../store/store'
import { AppProps } from 'next/app'
import { Alert } from '../components/page/alert/alert'
import '../scss/global.scss'
import styles from '../scss/page.module.scss'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <div className={styles.page}>
    <Component {...pageProps} />
    <Alert/>
  </div>
)

export default wrapper.withRedux(MyApp)