import { NextPage } from 'next'
import Head from 'next/head'
import { useState, FormEvent } from 'react'
import { connect } from 'react-redux'
import { Header, HeaderItem } from '../components/page/header/header'
import { Container, Row, Column } from '../components/page/grid/grid'
import { TextInput } from '../components/page/textInput/textInput'
import { Button } from '../components/page/button/button'
import { Form } from '../components/page/form/form'

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('form submit!')
    console.log(email)
    console.log(password)
  }

  return (
    <div>
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main>
        <Container vCenter>
          <Row>
            <Column lg="4" md="6" sm="8" cols="12" offset-lg="4" offset-md="3" offset-sm="2">
              <Form onSubmit={onSubmit}>
                <TextInput
                  name="email"
                  label="Email"
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
                <Button block type="submit">LOGIN</Button>
              </Form>
            </Column>
          </Row>
        </Container>
      </main>
    </div>
  )
}

export default connect(null, null)(Login)
