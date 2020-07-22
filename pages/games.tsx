import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { requestGames } from '../store/profile/action'
import { Container, Row, Column } from '../components/page/grid/grid'
import { Footer } from '../components/page/footer/footer'
import { GameList } from '../components/page/gameList/gameList'
import { MyThunkDispatch } from '../store/types'
import { bindThunkAction } from '../store/utils'
import { Header } from '../components/page/header/header'
import { withAuth } from '../components/utils/auth/auth'

type PropsFromRedux = ConnectedProps<typeof connector>

const Games: NextPage<PropsFromRedux> = ({ requestGames }) => {
  useEffect(() => {
    requestGames()
  }, [])

  return (
    <div>
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main>
        <Container>
          <Row>
            <Column cols="12">
              <GameList></GameList>
            </Column>
          </Row>
        </Container>
      </main>

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