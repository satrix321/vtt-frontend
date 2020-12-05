import { motion } from 'framer-motion'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Divider } from '../../components/page/divider/divider'
import { Footer } from '../../components/page/footer/footer'
import { Button } from '../../components/page/form/button/button'
import { Column, Container, Row } from '../../components/page/grid/grid'
import { Tab, TabItem, TabItems, Tabs } from '../../components/page/tabs/tabs'
import { withAuth } from '../../components/utils/auth/auth'

const Games: NextPage = () => {
  const [activeTab, setActiveTab] = useState('2')
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Container>
          <Row>
            <Column cols="4">
              <Tabs model={activeTab} onChange={(name) => setActiveTab(name)}>
                <Tab name="1">Home</Tab>
                <Tab name="2">Settings</Tab>
              </Tabs>

              <TabItems model={activeTab}>
                <TabItem name="1">Home!</TabItem>
                <TabItem name="2">
                  <Button small>Delete Game</Button>
                </TabItem>
              </TabItems>
            </Column>
          </Row>
        </Container>
      </motion.main>

      <Footer />
    </div>
  )
}

export default withAuth(Games)
