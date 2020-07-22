import React, { FC, useEffect } from 'react'
import { wrapper } from '../store/store'
import { AppProps } from 'next/app'
import { Alert } from '../components/page/alert/alert'
import styles from '../scss/page.module.scss'
import { useDispatch } from 'react-redux'
import { autoLogin } from '../store/profile/action'
import '../scss/global.scss'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

  return (
    <div className={styles.page}>
      <Component {...pageProps} />
      <Alert/>
    </div>
  )
}

export default wrapper.withRedux(MyApp)