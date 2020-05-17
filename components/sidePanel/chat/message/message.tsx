import styles from './message.module.scss'
import { GiRollingDices } from 'react-icons/gi'
import parser from '../../../../modules/parser';

type Props = {
  type?: 'message' | 'roll',
  nickname: string,
  timestamp: string,
  verbose?: boolean,
  tokens?: string[],
  result?: string,
}

const Message: React.FunctionComponent<Props> = (props) => {
  let content = props.children

  if (props.type && props.type === 'roll') {
    const equation = content as string

    if (props.verbose) {
      content = (
        <div className={styles['roll-verbose']}>
          <p className={styles.equation}>Rolling {equation}</p>
          <div><p className={styles.tokens}>({props.tokens?.join(' ')})</p></div>
          <div><p className={styles.result}>{props.result}</p></div>
        </div>
      )
    } else {
      content = (
        <div className={styles['roll-concise']}>
          <span className={styles.equation}>{equation}</span>
          <span className={styles.result}>{props.result}</span>
        </div>
      )
    }
  }

  return (
    <div className={styles.message}>
      <div className={styles.header}>
        <p className={styles.nickname}>{props.nickname}</p>
        <p className={styles.timestamp}>{props.timestamp}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          {content}
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