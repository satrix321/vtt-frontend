import { gql, useQuery } from '@apollo/client'
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

const GET_GAME = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
      id
      name
      description
      backgroundUrl
    }
  }
`

const Games: NextPage = () => {
  const router = useRouter()
  const [id] = useState<string | string[] | undefined>(router.query.id)
  const [activeTab, setActiveTab] = useState<string>('Home')
  const [confirmationModel, setConfirmationModal] = useState<boolean>(false)
  const { loading, error, data } = useQuery(GET_GAME, {
    variables: { id },
  })

  if (loading) {
    return <></>
  }

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
              <Tabs model={activeTab} onChange={(name) => setActiveTab(name)}>
                <Tab name="Home">Home</Tab>
                <Tab name="Settings">Settings</Tab>
              </Tabs>

              <TabItems model={activeTab}>
                <TabItem name="Home">
                  <Box>
                    <img
                      src={data.game.backgroundUrl ? data.game.backgroundUrl : '/fantasy-2847724_1920.jpg'}
                      alt="game image"
                    />
                    <h1>{data.game.name}</h1>
                    <p>{data.game.description}</p>
                  </Box>
                </TabItem>
                <TabItem name="Settings">
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

              <Modal open={confirmationModel} onClose={() => setConfirmationModal(false)}>
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
