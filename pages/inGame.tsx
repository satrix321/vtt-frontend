import Head from 'next/head'
import { connect } from 'react-redux'
import SidePanel from '../components/sidePanel/sidePanel'

const InGame = () => {
  return (
    <div>
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SidePanel />
      </main>
    </div>
  )
}

export default connect(null, null)(InGame)
