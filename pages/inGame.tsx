import Head from 'next/head'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import SidePanel from '../components/sidePanel/sidePanel'

const GameView = dynamic(
  () => import('../components/gameView/gameView'),
  { ssr: false }
)

const InGame = () => {
  return (
    <div>
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GameView />
        <SidePanel />
      </main>
    </div>
  )
}

export default connect(null, null)(InGame)
