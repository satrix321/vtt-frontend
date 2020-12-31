import { useState } from 'react'
import { Chat } from './chat/chat'
import { Menu } from './menu/menu'
import styles from './sidePanel.module.scss'

export const SidePanel: React.FunctionComponent = () => {
  const [activePanelId, setActivePanelId] = useState<string | undefined>(undefined)

  const onSectionChanged = (id: string | undefined) => {
    setActivePanelId(id)
  }

  return (
    <div className={styles['side-panel']}>
      {activePanelId === 'chat' && <Chat />}
      {activePanelId === 'characters' && <div></div>}
      {activePanelId === 'documents' && <div></div>}
      {activePanelId === 'maps' && <div></div>}
      {activePanelId === 'weather' && <div></div>}
      {activePanelId === 'music' && <div></div>}
      {activePanelId === 'initiative' && <div></div>}
      {activePanelId === 'macros' && <div></div>}
      {activePanelId === 'settings' && <div></div>}
      <Menu onSectionChangedCallback={onSectionChanged} />
    </div>
  )
}
