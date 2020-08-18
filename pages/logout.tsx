import { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/page/header/header'
import { Container, Row, Column } from '../components/page/grid/grid'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/profile/action'
import { motion } from 'framer-motion'

const Logout: NextPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logout())
  }, [])

  return (
    <div>
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Container vCenter>
          <Row>
            <Column lg="4" md="6" sm="8" cols="12" offset-lg="4" offset-md="3" offset-sm="2">
              Logout!
            </Column>
          </Row>
        </Container>
      </motion.main>
    </div>
  )
}

export default Logout