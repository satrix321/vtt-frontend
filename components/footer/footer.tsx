import { Container, Row, Column } from '../../components/grid/grid'
import './footer.scss'

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Column cols="12">
            <p className="copyright">© 2020 Krzysztof Szot</p>
          </Column>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer