import { NextPage } from 'next'
import Head from 'next/head'
import { useState, FormEvent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Header } from '../components/page/header/header'
import { Container, Row, Column } from '../components/page/grid/grid'
import { TextInput } from '../components/page/textInput/textInput'
import { Button } from '../components/page/button/button'
import { Form } from '../components/page/form/form'
import { register } from '../store/profile/action'
import { ErrorBlock } from '../components/page/errorBlock/errorBlock'
import { MyThunkDispatch } from '../store/types'
import { bindThunkAction } from '../store/utils'
import Router from 'next/router'
import styleUtils from '../scss/utils.module.scss'
import { motion } from 'framer-motion'

type PropsFromRedux = ConnectedProps<typeof connector>

const Register: NextPage<PropsFromRedux> = (props) => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (password !== confirmPassword) {
      setErrorMessage('Passwords don\'t match')
      return
    }

    try {
      const result = await props.register(email, password, username)
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

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Container vCenter>
          <Row center>
            <Column cols="12" sm="8" md="6" lg="4">
              <Form onSubmit={onSubmit}>
                <h1 className={styleUtils['text--center']}>Register</h1>
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
                <TextInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <ErrorBlock message={errorMessage}/>
                <Button block type="submit">SUBMIT</Button>
              </Form>
            </Column>
          </Row>
        </Container>
      </motion.main>
    </div>
  )
}

const mapDispatchToProps = (dispatch: MyThunkDispatch) => {
  return {
    register: bindThunkAction(register, dispatch)
  }
}

const connector = connect(null, mapDispatchToProps)
export default connector(Register)
