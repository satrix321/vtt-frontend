import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { requestGames } from '../store/profile/action'
import { Container, Row, Column } from '../components/page/grid/grid'
import { Footer } from '../components/page/footer/footer'
import { GameList } from '../components/page/gameList/gameList'
import { MyThunkDispatch } from '../store/types'
import { bindThunkAction } from '../store/utils'
import { Header } from '../components/page/header/header'
import { withAuth } from '../components/utils/auth/auth'
import { State } from '../store/store'
import { motion } from 'framer-motion'

type PropsFromRedux = ConnectedProps<typeof connector>

const Games: NextPage<PropsFromRedux> = ({ requestGames }) => {
  const userId = useSelector((state: State) => state.profile.user?.id)

  useEffect(() => {
    if (userId) {
      requestGames(userId)
    }
  }, [])

  return (
    <div>
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Container>
          <Row>
            <Column cols="12">
              <GameList></GameList>
            </Column>
          </Row>
        </Container>
      </motion.main>

      <Footer/>
    </div>
  )
}

const mapDispatchToProps = (dispatch: MyThunkDispatch) => {
  return {
    requestGames: bindThunkAction(requestGames, dispatch),
  }
}

const connector = connect(null, mapDispatchToProps)
export default withAuth(connector(Games))