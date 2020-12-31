import { Footer } from '@/components/page/footer/footer'
import { Column, Container, Row } from '@/components/page/grid/grid'
import { HeroHighlight } from '@/components/page/heroHighlight/heroHighlight'
import { MediaHighlight } from '@/components/page/mediaHighlight/mediaHighlight'
import { QuoteHighlight } from '@/components/page/quoteHighlight/quoteHighlight'
import { SystemsHighlight } from '@/components/page/systemsHighlight/systemsHighlight'
import { motion } from 'framer-motion'
import { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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

              <SystemsHighlight
                title="All your favorite systems in one place!"
                description="VTT is a highly customizable tool that can support any custom system. Start now with built-in support for most popular game systems."
                systems={[
                  {
                    imageSrc: '/fantasy-2847724_1920.jpg',
                  },
                  {
                    imageHref: 'https://www.google.com',
                    imageSrc: '/fantasy-2847724_1920.jpg',
                  },
                  {
                    imageHref: 'https://www.google.com',
                    imageSrc: '/fantasy-2847724_1920.jpg',
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
      </motion.main>

      <Footer />
    </div>
  )
}

export default Home
