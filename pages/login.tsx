import Head from 'next/head'
import { connect } from 'react-redux'
import { Header, HeaderItem } from '../components/header/header'
import LoginForm from '../components/loginForm/loginForm'

const Login = () => {
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
        <LoginForm />
      </main>
    </div>
  )
}

export default connect(null, null)(Login)
