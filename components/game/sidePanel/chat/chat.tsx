import { GiD4 } from 'react-icons/gi'
import { GiPerspectiveDiceSix } from 'react-icons/gi'
import { GiDiceEightFacesEight } from 'react-icons/gi'
import { GiD10 } from 'react-icons/gi'
import { GiD12 } from 'react-icons/gi'
import { GiDiceTwentyFacesTwenty } from 'react-icons/gi'
import { Message } from './message/message'
import styles from './chat.module.scss'
import { useRef, useState } from 'react'

export const Chat: React.FunctionComponent = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [inputText, setInputText] = useState<string>('')

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      console.log(inputText)

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }
  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value)
  }

  return (
    <div className={styles.chat}>
      <div className={styles['messages-container']}>
        <Message nickname="satrix321" timestamp="0000-00-00 00:00:00">
          Hello World!
        </Message>
        <Message
          type="roll"
          nickname="satrix321"
          timestamp="0000-00-00 00:00:00"
          tokens={['10', '+', '90', '+', '10']}
          result="110"
        >
          2d100 + 10
        </Message>
        <Message
          type="roll"
          verbose
          nickname="satrix321"
          timestamp="0000-00-00 00:00:00"
          tokens={['10', '+', '90', '+', '10']}
          result="110"
        >
          2d100 + 10
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
        <textarea
          placeholder="Type something here..."
          ref={inputRef}
          onKeyDown={onKeyDown}
          onChange={onInputChange}
        ></textarea>
      </div>
    </div>
  )
}