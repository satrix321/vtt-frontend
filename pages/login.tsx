import { NextPage } from 'next'
import Head from 'next/head'
import { useState, FormEvent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Header } from '../components/page/header/header'
import { Container, Row, Column } from '../components/page/grid/grid'
import { TextInput } from '../components/page/textInput/textInput'
import { Button } from '../components/page/button/button'
import { Form } from '../components/page/form/form'
import { ErrorBlock } from '../components/page/errorBlock/errorBlock'
import { MyThunkDispatch } from '../store/types'
import { bindThunkAction } from '../store/utils'
import { login } from '../store/profile/action'
import Router from 'next/router'
import styleUtils from '../scss/utils.module.scss'

type PropsFromRedux = ConnectedProps<typeof connector>

const Login: NextPage<PropsFromRedux> = (props) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await props.login(email, password)
      Router.push('/')
    } catch (e) {
      setErrorMessage(e.message)
    }
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
          <Row center>
            <Column cols="12" sm="8" md="6" lg="4">
              <Form onSubmit={onSubmit}>
              <h1 className={styleUtils['text--center']}>Login</h1>
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
                <ErrorBlock message={errorMessage}/>
                <Button block type="submit">LOGIN</Button>
              </Form>
            </Column>
          </Row>
        </Container>
      </main>
    </div>
  )
}

const mapDispatchToProps = (dispatch: MyThunkDispatch) => {
  return {
    login: bindThunkAction(login, dispatch)
  }
}

const connector = connect(null, mapDispatchToProps)
export default connector(Login)
