import { Menu } from './menu/menu'
import { Chat } from './chat/chat'
import styles from './sidePanel.module.scss'

export const SidePanel: React.FunctionComponent = () => {
  return (
    <div className={styles['side-panel']}>
      <Chat/>
      <Menu/>
    </div>
  )
}