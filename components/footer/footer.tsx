import { Container, Row, Column } from '../../components/grid/grid'
import styles from './footer.module.scss'

const Footer: React.FunctionComponent = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Column cols="12">
            <p className={styles.copyright}>© 2020 Krzysztof Szot</p>
          </Column>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer