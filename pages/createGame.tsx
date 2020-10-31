import { NextPage } from 'next'
import Head from 'next/head'
import { Container, Row, Column } from '../components/page/grid/grid'
import { motion } from 'framer-motion'
import { Form } from '../components/page/form/form'
import { Button } from '../components/page/form/button/button'
import { ErrorBlock } from '../components/page/form/errorBlock/errorBlock'
import { TextInput } from '../components/page/form/textInput/textInput'
import { FileInput } from '../components/page/form/fileInput/fileInput'
import { useState, FormEvent } from 'react'
import { TextArea, ResizeType } from '../components/page/form/textArea/textArea'
import { MyThunkDispatch } from '../store/types'
import { bindThunkAction } from '../store/utils'
import { connect, ConnectedProps } from 'react-redux'
import { createGame } from '../store/profile/actions'

type PropsFromRedux = ConnectedProps<typeof connector>

const CreateGame: NextPage<PropsFromRedux> = (props: PropsFromRedux) => {
  const [gameName, setGameName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [gameImage, setGameImage] = useState<FileList | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    props.createGame(0, gameName, description, gameImage)
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

const mapDispatchToProps = (dispatch: MyThunkDispatch) => {
  return {
    createGame: bindThunkAction(createGame, dispatch),
  }
}

const connector = connect(null, mapDispatchToProps)
export default connector(CreateGame)
