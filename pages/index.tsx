import Head from 'next/head'
import { connect } from 'react-redux'
import { Container, Row, Column } from '../components/grid/grid'
import { Header, HeaderItem } from '../components/header/header'
import Footer from '../components/footer/footer'
import MediaHighlight from '../components/mediaHighlight/mediaHighlight'
import SystemsHightlight from '../components/systemsHighlight/systemsHighlight'
import HeroHighlight from '../components/heroHighlight/heroHighlight'
import QuoteHighlight from '../components/quoteHighlight/quoteHighlight'

const Home = () => {
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
            <Column cols="12">

              <MediaHighlight
                title="VTT"
                subtitle="The Best Way to Play"
                description="Connect with your friends around the world, and immerse yourself in your own fantasy worlds! Sed odit laborum non. Totam optio praesentium sunt autem."
                ctaText="TRY IT NOW!"
                ctaHref="https://www.google.com"
              />

              <SystemsHightlight
                title="All your favorite systems in one place!"
                description="VTT is a highly customizable tool that can support any custom system. Start now with built-in support for most popular game systems."
                systems={[
                  {
                    imageSrc: "/fantasy-2847724_1920.jpg",
                  },
                  {
                    imageHref: "https://www.google.com",
                    imageSrc: "/fantasy-2847724_1920.jpg",
                  },
                  {
                    imageHref: "https://www.google.com",
                    imageSrc: "/fantasy-2847724_1920.jpg",
                  },
                ]}
              />

              <QuoteHighlight
                quote="New ideas and feature requests are frequently folded into the system making it an enjoyable, dynamic, and growing experience to play and create on the Astral platform"
                author="Clinton R. Oberholster, Astral Community Manager"
                ctaText="TRY IT NOW!"
                ctaHref="https://www.google.com"
              />

              <HeroHighlight
                title="VTT"
                subtitle="The Best Way to Play"
                description="Connect with your friends around the world, and immerse yourself in your own fantasy worlds! Sed odit laborum non. Totam optio praesentium sunt autem."
                ctaText="TRY IT NOW!"
                ctaHref="https://www.google.com"
                backgroundSrc="/fantasy-2847724_1920.jpg"
              />

            </Column>
          </Row>
        </Container>
      </main>

      <Footer/>
    </div>
  )
}

export default connect(null, null)(Home)
