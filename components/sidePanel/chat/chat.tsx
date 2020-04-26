import styles from './chat.module.scss'
import { GiD4 } from 'react-icons/gi'
import { GiPerspectiveDiceSix } from 'react-icons/gi'
import { GiDiceEightFacesEight } from 'react-icons/gi'
import { GiD10 } from 'react-icons/gi'
import { GiD12 } from 'react-icons/gi'
import { GiDiceTwentyFacesTwenty } from 'react-icons/gi'
import Message from './message/message'

const Chat: React.FunctionComponent = () => {
  return (
    <div className={styles.chat}>
      <div className={styles['messages-container']}>
        <Message nickname="satrix321" timestamp="0000-00-00 00:00:00">
          Hello World!
        </Message>
        <Message type="roll" nickname="satrix321" timestamp="0000-00-00 00:00:00">
          2d100
        </Message>
      </div>
      <div className={styles['dice-inputs']}>
        <div className={styles.die}><GiD4/></div>
        <div className={styles.die}><GiPerspectiveDiceSix /></div>
        <div className={styles.die}><GiDiceEightFacesEight /></div>
        <div className={styles.die}><GiD10 /></div>
        <div className={styles.die}><GiD12 /></div>
        <div className={styles.die}><GiDiceTwentyFacesTwenty /></div>
        <div className={styles.die}>
          <div className={styles.d100}><GiD10 /><GiD10 /></div>
        </div>
      </div>
      <div className={styles['chat-input']}>
        <textarea placeholder="Type something here..."></textarea>
      </div>
    </div>
  )
}

export default Chat