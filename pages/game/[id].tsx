import { Box, BoxContent, BoxFooter, BoxTitle } from '@/components/page/box/box'
import { Cta } from '@/components/page/cta/cta'
import { Footer } from '@/components/page/footer/footer'
import { Button } from '@/components/page/form/button/button'
import { ErrorBlock } from '@/components/page/form/errorBlock/errorBlock'
import { FileInput } from '@/components/page/form/fileInput/fileInput'
import { Form } from '@/components/page/form/form'
import { ResizeType, TextArea } from '@/components/page/form/textArea/textArea'
import { TextInput } from '@/components/page/form/textInput/textInput'
import { Column, Container, Row } from '@/components/page/grid/grid'
import { Modal } from '@/components/page/modal/modal'
import { Spacer } from '@/components/page/spacer/spacer'
import { Tab, TabItem, TabItems, Tabs } from '@/components/page/tabs/tabs'
import { withAuth } from '@/components/utils/auth/auth'
import { gql, useMutation, useQuery } from '@apollo/client'
import { motion } from 'framer-motion'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

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

const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    deleteGame(id: $id) {
      id
      name
    }
  }
`

const UPDATE_GAME = gql`
  mutation UpdateGame($game: GameInput!) {
    updateGame(game: $game) {
      id
      name
    }
  }
`

const Games: NextPage = () => {
  const router = useRouter()
  const [id] = useState<string | string[] | undefined>(router.query.id)
  const [activeTab, setActiveTab] = useState<string>('Home')
  const [confirmationModel, setConfirmationModal] = useState<boolean>(false)
  const { loading, data } = useQuery(GET_GAME, {
    variables: { id },
  })
  const [deleteGame] = useMutation(DELETE_GAME)

  const [gameName, setGameName] = useState<string>('')
  const [gameDescription, setGameDescription] = useState<string>('')
  const [gameImage, setGameImage] = useState<FileList | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [updateGame] = useMutation(UPDATE_GAME)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      if (gameImage && gameImage.length) {
        await updateGame({
          variables: { game: { id, name: gameName, description: gameDescription, backgroundImageFile: gameImage[0] } },
        })
      } else {
        await updateGame({ variables: { game: { id, name: gameName, description: gameDescription } } })
      }
      router.push('/games')
    } catch (e) {
      setErrorMessage(e.message)
    }
  }

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
                <Tab name="Edit">Edit</Tab>
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
                    <p>
                      <Cta small href="/inGame">
                        Start Game
                      </Cta>
                    </p>
                    <p>{data.game.description}</p>
                  </Box>
                </TabItem>
                <TabItem name="Edit">
                  <Container>
                    <Row center>
                      <Column cols="12" sm="8" md="6" lg="4">
                        <Form onSubmit={onSubmit}>
                          <h1 style={{ textAlign: 'center' }}>Edit Game</h1>

                          <TextInput
                            name="gameName"
                            label="Game Name"
                            value={gameName}
                            required
                            onChange={(e) => setGameName(e.target.value)}
                          />
                          <TextArea
                            name="description"
                            label="Description"
                            value={gameDescription}
                            onChange={(e) => setGameDescription(e.target.value)}
                            resize={ResizeType.Vertical}
                            minHeight={200}
                          />
                          <FileInput
                            name="gameImage"
                            label="Game Image"
                            accept="image/*"
                            imagePreview
                            onChange={(e) => setGameImage(e.target.files)}
                          />
                          <ErrorBlock message={errorMessage} />
                          <Button block secondary type="submit">
                            SUBMIT
                          </Button>
                        </Form>
                      </Column>
                    </Row>
                  </Container>
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
                      onClick={async () => {
                        await deleteGame({ variables: { id } })
                        setConfirmationModal(false)
                        router.push('/games')
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
