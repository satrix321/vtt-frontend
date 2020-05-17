import styles from './loginForm.module.scss'
import TextInput from '../textInput/textInput'
import { Container, Row, Column } from '../../components/grid/grid'
import Button from '../button/button'

const LoginForm: React.FunctionComponent = () => {
  return (
    <div>
      <Container>
        <Row>
          <Column cols="4" offset="4">
            <TextInput name="email" label="Email"/>
            <TextInput name="password" label="Password" type="password"/>
            <Button block type="submit">LOGIN</Button>
          </Column>  
        </Row>
      </Container>
    </div>
  )
}

export default LoginForm