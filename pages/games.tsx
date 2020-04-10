import Head from 'next/head'
import { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestGames } from '../store/profile/action'
import { Container, Row, Column } from '../components/grid/grid'
import Footer from '../components/footer/footer'
import GameList from '../components/gameList/gameList'

type Props = {
  requestGames: any
}

const Games = (props: Props) => {
  useEffect(() => {
    props.requestGames()
  }, [props])

  return (
    <div className="container">
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

Games.getInitialProps = async ({ store, isServer }: any) => {
  store.dispatch(requestGames())
  return { isServer }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    requestGames: bindActionCreators(requestGames, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Games)
