import classNames from 'classnames'
import { useState } from 'react'
import { AiFillCode } from 'react-icons/ai'
import { FaCogs } from 'react-icons/fa'
import { GiBookmark, GiPerson, GiSpinningSword, GiTreasureMap } from 'react-icons/gi'
import { IoMdChatboxes } from 'react-icons/io'
import { MdQueueMusic } from 'react-icons/md'
import { TiWeatherPartlySunny } from 'react-icons/ti'
import styles from './menu.module.scss'

type Props = {
  onSectionChangedCallback?: (id: string | undefined) => void
}

export const Menu: React.FunctionComponent<Props> = (props: Props) => {
  const [menuItems, setMenuItems] = useState([
    { id: 'chat', active: false, content: <IoMdChatboxes /> },
    { id: 'characters', active: false, content: <GiPerson /> },
    { id: 'documents', active: false, content: <GiBookmark /> },
    { id: 'maps', active: false, content: <GiTreasureMap /> },
    { id: 'weather', active: false, content: <TiWeatherPartlySunny /> },
    { id: 'music', active: false, content: <MdQueueMusic /> },
    { id: 'initiative', active: false, content: <GiSpinningSword /> },
    { id: 'macros', active: false, content: <AiFillCode /> },
    { id: 'settings', active: false, content: <FaCogs /> },
  ])

  const changeSection = (event: React.MouseEvent<HTMLDivElement>) => {
    const menuItemsTemp = [...menuItems]
    let id = event.currentTarget.dataset.id

    for (const menuItem of menuItemsTemp) {
      if (menuItem.active && menuItem.id === event.currentTarget.dataset.id) {
        menuItem.active = false
        id = undefined
      } else {
        menuItem.active = menuItem.id === event.currentTarget.dataset.id
      }
    }
    setMenuItems(menuItemsTemp)

    if (props.onSectionChangedCallback) {
      props.onSectionChangedCallback(id)
    }
  }

  return (
    <div className={styles.menu}>
      {menuItems.map((item) => {
        return (
          <div
            key={item.id}
            data-id={item.id}
            onClick={changeSection}
            className={classNames(styles['menu-item'], { [styles['active']]: item.active })}
          >
            {item.content}
          </div>
        )
      })}
    </div>
  )
}
