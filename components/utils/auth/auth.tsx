import Login from '@/pages/login'
import { State } from '@/store/store'
import { NextPage } from 'next'
import { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'

export const withAuth = (Page: NextPage): NextPage => {
  const Wrapper = (props: PropsWithChildren<unknown>) => {
    const isLogged = useSelector((state: State) => state.profile.isLogged)

    if (isLogged === true) {
      return <Page {...props} />
    } else if (isLogged === false) {
      return <Login />
    } else {
      return null
    }
  }

  if (Page.getInitialProps) {
    Wrapper.getInitialProps = Page.getInitialProps
  }

  return Wrapper
}
