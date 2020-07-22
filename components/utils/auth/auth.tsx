import { useSelector } from 'react-redux'
import { State } from '../../../store/store'
import Login from '../../../pages/login'

export const withAuth = (Component: any) => {
  const Wrapper = (props: any) => {
    const isLogged = useSelector((state: State) => state.profile.isLogged)
    
    if (isLogged) {
      return <Component {...props} />
    } else {
      return <Login />
    }
  }

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps
  }

  return Wrapper
}