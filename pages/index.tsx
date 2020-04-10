import Head from 'next/head'
import { connect } from 'react-redux'
import { Container, Row, Column } from '../components/grid/grid'
import { Header, HeaderItem } from '../components/header/header'
import Footer from '../components/footer/footer'
import Highlight from '../components/highlight/highlight'

const Home = () => {
  return (
    <div>
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <HeaderItem href="/">FAQ</HeaderItem>
        <HeaderItem href="/games">Sign In</HeaderItem>
      </Header>

      <main>
        <Container>
          <Row>
            <Column cols="12">
              {/* <p>Hello World!</p> */}
              
              <Highlight/>

            </Column>
          </Row>
        </Container>
      </main>

      <Footer/>
    </div>
  )
}

export default connect(null, null)(Home)
