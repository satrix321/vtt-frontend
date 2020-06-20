import { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { SidePanel } from '../components/game/sidePanel/sidePanel'

const GameView = dynamic(
  async () => {
    const { GameView } = await import('../components/game/gameView/gameView')
    return GameView
  },
  { ssr: false }
)

const InGame: NextPage = () => {
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
