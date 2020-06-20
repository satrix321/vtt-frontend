import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestGames } from '../store/profile/action'
import { Container, Row, Column } from '../components/page/grid/grid'
import { Footer } from '../components/page/footer/footer'
import { GameList } from '../components/page/gameList/gameList'
import { wrapper } from '../store/store'

type Props = {
  requestGames: any,
}

const Games: NextPage<Props> = (props) => {
  useEffect(() => {
    props.requestGames()
  }, [props])

  return (
    <div>
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    requestGames: bindActionCreators(requestGames, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Games)