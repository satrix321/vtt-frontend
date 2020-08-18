import { Container, Row, Column } from '../grid/grid'
import styles from './footer.module.scss'
import { motion } from 'framer-motion'

export const Footer: React.FunctionComponent = () => {
  return (
    <motion.footer className={styles.footer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Container>
        <Row>
          <Column cols="12">
            <p className={styles.copyright}>© 2020 Krzysztof Szot</p>
          </Column>
        </Row>
      </Container>
    </motion.footer>
  )
}