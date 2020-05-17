import Head from 'next/head'
import { connect } from 'react-redux'
import { Header, HeaderItem } from '../components/header/header'

const Register = () => {
  return (
    <div>
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <HeaderItem href="/inGame">Game View</HeaderItem>
        <HeaderItem href="/games">Games List</HeaderItem>
        <HeaderItem href="/">FAQ</HeaderItem>
        <HeaderItem href="/login">Login</HeaderItem>
        <HeaderItem href="/register">Register</HeaderItem>
      </Header>

      <main>
        <div>aaaa</div>
      </main>
    </div>
  )
}

export default connect(null, null)(Register)
