import { NextPage } from 'next'
import Head from 'next/head'
import { Header, HeaderItem } from '../components/page/header/header'
import { Container, Row, Column } from '../components/page/grid/grid'

const RegisterSuccess: NextPage = () => {
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
              
            </Column>
          </Row>
        </Container>
      </main>
    </div>
  )
}

export default RegisterSuccess