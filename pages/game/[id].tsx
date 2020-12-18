import { motion } from 'framer-motion'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Box, BoxContent, BoxFooter, BoxTitle } from '../../components/page/box/box'
import { Footer } from '../../components/page/footer/footer'
import { Button } from '../../components/page/form/button/button'
import { Column, Container, Row } from '../../components/page/grid/grid'
import { Modal } from '../../components/page/modal/modal'
import { Spacer } from '../../components/page/spacer/spacer'
import { Tab, TabItem, TabItems, Tabs } from '../../components/page/tabs/tabs'
import { withAuth } from '../../components/utils/auth/auth'

const Games: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string>('2')
  const [confirmationModel, setConfirmationModal] = useState<boolean>(false)
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
                <TabItem name="1">
                  <Box>Hello World!</Box>
                </TabItem>
                <TabItem name="2">
                  <Box>
                    <BoxContent>
                      <Button
                        small
                        onClick={() => {
                          setConfirmationModal(true)
                        }}
                      >
                        Delete Game
                      </Button>
                    </BoxContent>
                  </Box>
                </TabItem>
              </TabItems>

              <Modal open={confirmationModel}>
                <Box>
                  <BoxTitle>Confirmation</BoxTitle>
                  <BoxContent>Are you sure you want to delete this game?</BoxContent>
                  <BoxFooter>
                    <Spacer />
                    <Button
                      small
                      onClick={() => {
                        setConfirmationModal(false)
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      small
                      secondary
                      onClick={() => {
                        setConfirmationModal(false)
                      }}
                    >
                      No
                    </Button>
                  </BoxFooter>
                </Box>
              </Modal>
            </Column>
          </Row>
        </Container>
      </motion.main>

      <Footer />
    </div>
  )
}

export default withAuth(Games)
