import { motion } from 'framer-motion'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { Footer } from '../components/page/footer/footer'
import { GameList } from '../components/page/gameList/gameList'
import { Column, Container, Row } from '../components/page/grid/grid'
import { withAuth } from '../components/utils/auth/auth'
import { requestGames } from '../store/profile/actions'
import { State } from '../store/store'
import { MyThunkDispatch } from '../store/types'
import { bindThunkAction } from '../store/utils'

type PropsFromRedux = ConnectedProps<typeof connector>

const Games: NextPage<PropsFromRedux> = (props: PropsFromRedux) => {
  const userId = useSelector((state: State) => state.profile.user?.id)

  useEffect(() => {
    if (userId) {
      props.requestGames(userId)
    }
  }, [])

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

const mapDispatchToProps = (dispatch: MyThunkDispatch) => {
  return {
    requestGames: bindThunkAction(requestGames, dispatch),
  }
}

const connector = connect(null, mapDispatchToProps)
export default withAuth(connector(Games))
