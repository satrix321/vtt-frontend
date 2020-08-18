import { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { SidePanel } from '../components/game/sidePanel/sidePanel'
import { motion } from 'framer-motion'

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

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <GameView />
        <SidePanel />
      </motion.main>
    </div>
  )
}

export default connect(null, null)(InGame)
