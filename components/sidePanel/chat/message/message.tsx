import './message.scss'
import { GiRollingDices } from 'react-icons/gi'

type Props = {
  type?: 'message' | 'roll',
  nickname: string,
  timestamp: string,
  verbose?: boolean,
}

const Message: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="message">
      <div className="header">
        <p className="nickname">{props.nickname}</p>
        <p className="timestamp">{props.timestamp}</p>
      </div>
      <div className="content">
        <div className="text">
          {(() => {
          if (props.type && props.type === 'roll') {
            if (props.verbose) {
              return props.children
            } else {
              return props.children
            }
          } else {
            return props.children
          }
        })()}
        </div>
        {(() => {
          if (props.type === 'roll') {
            return (
              <div className="dice">
                <GiRollingDices />
              </div>
            )
          }
        })()}
      </div>
    </div>
  )
}

export default Message