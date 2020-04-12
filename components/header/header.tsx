import Link from 'next/link'
import { Container, Row, Column } from '../../components/grid/grid'
import './header.scss'

export const Header: React.FunctionComponent = (props) => {
  return (
    <header className="header">
      <Container>
        <Row>
          <Column cols="2">
            <div className="logo-container">
              <img className="logo" src="logo-inverted.png" alt="logo"/>
              <span className="logo-text">VTT</span>
            </div>
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
        <a className="link">{props.children}</a>
      </Link>
    </div>
  )
}