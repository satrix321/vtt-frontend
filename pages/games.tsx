import { motion } from 'framer-motion'
import { NextPage } from 'next'
import Head from 'next/head'
import { Footer } from '../components/page/footer/footer'
import { GameList } from '../components/page/gameList/gameList'
import { Column, Container, Row } from '../components/page/grid/grid'
import { withAuth } from '../components/utils/auth/auth'

const Games: NextPage = () => {
  return (
    <div>
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Container>
          <Row>
            <Column cols="12">
              <GameList></GameList>
            </Column>
          </Row>
        </Container>
      </motion.main>

      <Footer />
    </div>
  )
}

export default withAuth(Games)
