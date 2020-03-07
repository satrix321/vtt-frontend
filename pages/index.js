import Head from 'next/head'
import { bindActionCreators } from 'redux'
import GamesList from '../components/gamesList'
import { requestGames } from '../store/profile/action'
import { connect } from 'react-redux'
import { useEffect } from 'react'

const Home = props => {
  useEffect(() => {
    props.requestGames()
  }, [props])

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GamesList></GamesList>
      </main>

      <footer></footer>

      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </div>
  );
};

Home.getInitialProps = async ({ store, isServer }) => {
  store.dispatch(requestGames())
  return { isServer }
}

const mapDispatchToProps = dispatch => {
  return {
    requestGames: bindActionCreators(requestGames, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Home)
