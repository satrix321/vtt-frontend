import { ChangeEvent, useCallback, useState, useRef } from 'react'
import styles from './fileInput.module.scss'
import classNames from 'classnames'

type Props = {
  name?: string,
  label?: string,
  multiple?: boolean,
  accept?: string,
  imagePreview?: boolean,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any
}

type FileWrapper = {
  file: File,
  imageURL: string
}

export const FileInput: React.FunctionComponent<Props> = (props) => {
  const [fileWrappers, setFileWrappers] = useState<FileWrapper[]>([])
  const labelRef = useRef<HTMLLabelElement>(null)

  const inputWrapperClasses = [styles['input-wrapper']]
  if (props.multiple) {
    inputWrapperClasses.push(styles['multiple-files'])
  }

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files: FileWrapper[] = []

      for (let i = 0; i < event.target.files.length; i++) {
        files.push({
          file: event.target.files[i],
          imageURL: URL.createObjectURL(event.target.files[i])
        })
      }

      setFileWrappers(files)
    }

    if (props.onChange) {
      props.onChange(event)
    }
  }, [])

  const onKeyPress = useCallback((event: React.KeyboardEvent<HTMLSpanElement>) => {
    const keyCode = event.which || event.keyCode
    if (keyCode === 13 || keyCode === 32) {
      labelRef.current?.click()
    }
  }, [])

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
        <div className={classNames(inputWrapperClasses)}>
          <span
            className={styles.button}
            tabIndex={0}
            onKeyPress={onKeyPress}
          >
            UPLOAD
          </span>
          {!props.imagePreview &&
            fileWrappers.map((fileWrapper) => (
              <p className={styles.filename}>{fileWrapper.file.name}</p>
            ))
          }
        </div>
        {props.imagePreview &&
          <div className={styles['image-previews']}>
            {
              fileWrappers.map((fileWrapper) => (
                <div className={styles.preview}>
                  <img src={fileWrapper.imageURL} key={fileWrapper.imageURL}></img>
                  <span className={styles.filename}>{fileWrapper.file.name}</span>
                </div>
              ))
            }
          </div>
        }
      </label>
    </div>
  )
}