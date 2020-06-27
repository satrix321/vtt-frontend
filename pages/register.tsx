import { NextPage } from 'next'
import Head from 'next/head'
import { useState, FormEvent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header, HeaderItem } from '../components/page/header/header'
import { Container, Row, Column } from '../components/page/grid/grid'
import { TextInput } from '../components/page/textInput/textInput'
import { Button } from '../components/page/button/button'
import { Form } from '../components/page/form/form'
import { register } from '../store/profile/action'

type Props = {
  register: (email: string, password: string, username?: string) => any,
}

const Register: NextPage<Props> = (props) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const response = await props.register(email, password, username)
    console.log(response)
  }

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
        <Container>
          <Row>
            <Column lg="4" md="6" cols="10" offset-lg="4" offset-md="3" offset="1">
              <Form onSubmit={onSubmit}>
                <TextInput
                  name="username"
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextInput
                  name="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button block type="submit">SUBMIT</Button>
              </Form>
            </Column>
          </Row>
        </Container>
      </main>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    register: bindActionCreators(register, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Register)
