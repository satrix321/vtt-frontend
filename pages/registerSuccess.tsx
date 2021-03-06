import { Column, Container, Row } from '@/components/page/grid/grid'
import { motion } from 'framer-motion'
import { NextPage } from 'next'
import Head from 'next/head'

const RegisterSuccess: NextPage = () => {
  return (
    <div>
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Container vCenter>
          <Row>
            <Column lg="4" md="6" sm="8" cols="12" offset-lg="4" offset-md="3" offset-sm="2">
              Register Success!
            </Column>
          </Row>
        </Container>
      </motion.main>
    </div>
  )
}

export default RegisterSuccess
