import styles from './menu.module.scss'
import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { IoMdChatboxes } from 'react-icons/io'
import { GiPerson } from 'react-icons/gi'
import { GiBookmark } from 'react-icons/gi'
import { GiTreasureMap } from 'react-icons/gi'
import { TiWeatherPartlySunny } from 'react-icons/ti'
import { MdQueueMusic } from 'react-icons/md'
import { GiSpinningSword } from 'react-icons/gi'
import { AiFillCode } from 'react-icons/ai'
import { FaCogs } from 'react-icons/fa'

const Menu: React.FunctionComponent = () => {
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

  const changeSection = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const menuItemsTemp = [...menuItems]
    for (const menuItem of menuItemsTemp) {
      menuItem.active = menuItem.id === event.currentTarget.dataset.id
    }
    setMenuItems(menuItemsTemp)
  }, [])

  return (
    <div className={styles.menu}>
      {menuItems.map((item) => {
        const classes = [styles['menu-item']];
        if (item.active) {
          classes.push(styles['active'])
        }

        return (
          <div key={item.id} data-id={item.id} onClick={changeSection} className={classNames(classes)}>
            {item.content}
          </div>
        )
      })}
    </div>
  )
}

export default Menu