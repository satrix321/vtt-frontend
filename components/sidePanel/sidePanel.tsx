import styles from './sidePanel.module.scss'
import Menu from './menu/menu'
import Chat from './chat/chat'

const SidePanel: React.FunctionComponent = () => {
  return (
    <div className={styles['side-panel']}>
      <Chat/>
      <Menu/>
    </div>
  )
}

export default SidePanel