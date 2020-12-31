import classNames from 'classnames'
import { ChangeEvent, useRef, useState } from 'react'
import styles from './fileInput.module.scss'

type Props = {
  name?: string
  label?: string
  multiple?: boolean
  accept?: string
  imagePreview?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

type FileWrapper = {
  file: File
  imageURL: string
}

export const FileInput: React.FunctionComponent<Props> = (props: Props) => {
  const [fileWrappers, setFileWrappers] = useState<FileWrapper[]>([])
  const labelRef = useRef<HTMLLabelElement>(null)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files: FileWrapper[] = []

      for (let i = 0; i < event.target.files.length; i++) {
        files.push({
          file: event.target.files[i],
          imageURL: URL.createObjectURL(event.target.files[i]),
        })
      }

      setFileWrappers(files)
    }

    if (props.onChange) {
      props.onChange(event)
    }
  }

  const onKeyPress = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    const key = event.key
    if (key === 'Enter' || key === ' ') {
      labelRef.current?.click()
    }
  }

  return (
    <div className={styles['form-component']}>
      <label ref={labelRef} className={styles.label}>
        {props.label}
        <input
          className={styles.input}
          name={props.name}
          type="file"
          onChange={onChange}
          multiple={props.multiple}
          accept={props.accept}
        ></input>
        <div className={classNames(styles['input-wrapper'], { [styles['multiple-files']]: props.multiple })}>
          <span className={styles.button} tabIndex={0} onKeyPress={onKeyPress}>
            UPLOAD
          </span>
          {!props.imagePreview &&
            fileWrappers.map((fileWrapper) => (
              <p className={styles.filename} key={fileWrapper.imageURL}>
                {fileWrapper.file.name}
              </p>
            ))}
        </div>
        {props.imagePreview && (
          <div className={styles['image-previews']}>
            {fileWrappers.map((fileWrapper) => (
              <div className={styles.preview} key={fileWrapper.imageURL}>
                <img src={fileWrapper.imageURL}></img>
                <span className={styles.filename}>{fileWrapper.file.name}</span>
              </div>
            ))}
          </div>
        )}
      </label>
    </div>
  )
}
