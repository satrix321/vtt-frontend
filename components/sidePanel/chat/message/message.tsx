import styles from './message.module.scss'
import { GiRollingDices } from 'react-icons/gi'

type Props = {
  type?: 'message' | 'roll',
  nickname: string,
  timestamp: string,
  verbose?: boolean,
}

const Message: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={styles.message}>
      <div className={styles.header}>
        <p className={styles.nickname}>{props.nickname}</p>
        <p className={styles.timestamp}>{props.timestamp}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
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
              <div className={styles.dice}>
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