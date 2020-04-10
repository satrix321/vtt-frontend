import Link from 'next/link'
import { Container, Row, Column } from '../../components/grid/grid'
import './header.scss'

export const Header: React.FunctionComponent = (props) => {
  return (
    <header className="header">
      <Container>
        <Row>
          <Column cols="2">
            <picture>
              <img alt="logo"></img>
            </picture>
          </Column>
          <Column cols="10">
            <nav className="navigation">
              {props.children}
            </nav>
          </Column>
        </Row>
      </Container>
    </header>
  )
}

type HeaderItemProps = {
  href: string
}

export const HeaderItem: React.FunctionComponent<HeaderItemProps> = (props) => {
  return (
    <div className="header-item">
      <Link href={props.href}>
        {props.children}
      </Link>
    </div>
  )
}