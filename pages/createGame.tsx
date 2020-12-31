import { Button } from '@/components/page/form/button/button'
import { ErrorBlock } from '@/components/page/form/errorBlock/errorBlock'
import { FileInput } from '@/components/page/form/fileInput/fileInput'
import { Form } from '@/components/page/form/form'
import { ResizeType, TextArea } from '@/components/page/form/textArea/textArea'
import { TextInput } from '@/components/page/form/textInput/textInput'
import { Column, Container, Row } from '@/components/page/grid/grid'
import { gql, useMutation } from '@apollo/client'
import { motion } from 'framer-motion'
import { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useState } from 'react'

const CREATE_GAME = gql`
  mutation($name: String!, $description: String, $file: Upload!) {
    createGame(name: $name, description: $description, file: $file) {
      id
      name
    }
  }
`

const CreateGame: NextPage = () => {
  const [gameName, setGameName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [gameImage, setGameImage] = useState<FileList | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [createGame] = useMutation(CREATE_GAME)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (gameImage && gameImage.length) {
      createGame({ variables: { name: gameName, description: description, file: gameImage[0] } })
    }
  }

  return (
    <div>
      <Head>
        <title>VTT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Container>
          <Row center>
            <Column cols="12" sm="8" md="6" lg="4">
              <Form onSubmit={onSubmit}>
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                <Button block type="submit">
                  SUBMIT
                </Button>
              </Form>
            </Column>
          </Row>
        </Container>
      </motion.main>
    </div>
  )
}

export default CreateGame
