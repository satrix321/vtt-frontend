import './sidePanel.scss'
import Menu from './menu/menu'
import Chat from './chat/chat'

const SidePanel: React.FunctionComponent = () => {
  return (
    <div className="side-panel">
      <Chat/>
      <Menu/>
    </div>
  )
}

export default SidePanel