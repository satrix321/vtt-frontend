import { ChangeEvent } from 'react'
import styles from './textArea.module.scss'
import classNames from 'classnames'

export enum ResizeType {
  None = 1,
  Horizontal,
  Vertical,
  Both
}

type Props = {
  name?: string,
  label?: string,
  type?: string,
  value?: string,
  width?: number,
  height?: number,
  minWidth?: number,
  minHeight?: number,
  resize?: ResizeType,
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => any
}

export const TextArea: React.FunctionComponent<Props> = (props) => {
  const classes: string[] = [styles.textarea]
  if (props.resize) {
    switch (props.resize as ResizeType) {
      case ResizeType.None:
        classes.push(styles['resize-none'])
        break
      case ResizeType.Horizontal:
        classes.push(styles['resize-horizontal'])
        break
      case ResizeType.Vertical:
        classes.push(styles['resize-vertical'])
        break
      case ResizeType.Both:
        classes.push(styles['resize-both'])
        break
    }
  } else {
    classes.push(styles['resize-both'])
  }

  return (
    <div className={styles['form-component']}>
      <label className={styles.label}>
        {props.label}
        <textarea
          className={classNames(classes)}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          style={{
            width: props.width,
            height: props.height,
            minWidth: props.minWidth,
            minHeight: props.minHeight,
          }}
        ></textarea>
      </label>
    </div>
  )
}