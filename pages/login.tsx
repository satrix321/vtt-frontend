import { Button } from '@/components/page/form/button/button'
import { ErrorBlock } from '@/components/page/form/errorBlock/errorBlock'
import { Form } from '@/components/page/form/form'
import { TextInput } from '@/components/page/form/textInput/textInput'
import { Column, Container, Row } from '@/components/page/grid/grid'
import styleUtils from '@/scss/utils.module.scss'
import { login } from '@/store/profile/actions'
import { MyThunkDispatch } from '@/store/types'
import { motion } from 'framer-motion'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

const Login: NextPage = () => {
  const dispatch: MyThunkDispatch = useDispatch()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      await dispatch(login(email, password))
      if (Router.route === '/login') {
        Router.push('/')
      }
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

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Container vCenter>
          <Row center>
            <Column cols="12" sm="8" md="6" lg="4">
              <Form onSubmit={onSubmit}>
                <h1 className={styleUtils['text--center']}>Login</h1>
                <TextInput
                  name="email"
                  label="Email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <ErrorBlock message={errorMessage} />
                <Button block type="submit">
                  LOGIN
                </Button>
              </Form>
            </Column>
          </Row>
        </Container>
      </motion.main>
    </div>
  )
}

export default Login
