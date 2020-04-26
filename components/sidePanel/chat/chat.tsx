import './chat.scss'
import { GiD4 } from 'react-icons/gi'
import { GiPerspectiveDiceSix } from 'react-icons/gi'
import { GiDiceEightFacesEight } from 'react-icons/gi'
import { GiD10 } from 'react-icons/gi'
import { GiD12 } from 'react-icons/gi'
import { GiDiceTwentyFacesTwenty } from 'react-icons/gi'
import Message from './message/message'

const Chat: React.FunctionComponent = () => {
  return (
    <div className="chat">
      <div className="messages-container">
        <Message nickname="satrix321" timestamp="0000-00-00 00:00:00">
          Hello World!
        </Message>
        <Message type="roll" nickname="satrix321" timestamp="0000-00-00 00:00:00">
          2d100
        </Message>
      </div>
      <div className="dice-inputs">
        <div className="die"><GiD4/></div>
        <div className="die"><GiPerspectiveDiceSix /></div>
        <div className="die"><GiDiceEightFacesEight /></div>
        <div className="die"><GiD10 /></div>
        <div className="die"><GiD12 /></div>
        <div className="die"><GiDiceTwentyFacesTwenty /></div>
        <div className="die">
          <div className="d100"><GiD10 /><GiD10 /></div>
        </div>
      </div>
      <div className="chat-input">
        <textarea placeholder="Type something here..."></textarea>
      </div>
    </div>
  )
}

export default Chat